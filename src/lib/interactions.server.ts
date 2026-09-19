export type InteractionResult = {
  available: boolean;
  reason?: string;
  source?: string;
  checked?: string[];
  interactions: { drugs: string[]; description: string; severity: string | null }[];
};

const RXNAV = "https://rxnav.nlm.nih.gov/REST";

async function resolveRxcui(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${RXNAV}/rxcui.json?name=${encodeURIComponent(name)}&search=2`);
    if (!res.ok) return null;
    const json = (await res.json()) as { idGroup?: { rxnormId?: string[] } };
    return json.idGroup?.rxnormId?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function checkInteractions(names: string[]): Promise<InteractionResult> {
  const unique = Array.from(new Set(names.map((n) => n.trim()).filter(Boolean)));
  if (unique.length < 2) {
    return {
      available: true,
      source: "RxNav (U.S. National Library of Medicine)",
      checked: unique,
      interactions: [],
    };
  }

  const resolved: { name: string; rxcui: string }[] = [];
  for (const name of unique) {
    const rxcui = await resolveRxcui(name);
    if (rxcui) resolved.push({ name, rxcui });
  }

  if (resolved.length < 2) {
    return {
      available: false,
      reason:
        "We couldn't match enough of your medications to a recognised drug identifier, so an interaction check can't be performed.",
      interactions: [],
    };
  }

  try {
    const res = await fetch(
      `${RXNAV}/interaction/list.json?rxcuis=${resolved.map((r) => r.rxcui).join("+")}`,
    );
    if (!res.ok) throw new Error(`RxNav responded ${res.status}`);
    const json = (await res.json()) as {
      fullInteractionTypeGroup?: {
        sourceName?: string;
        fullInteractionType?: {
          interactionPair?: {
            description?: string;
            severity?: string;
            interactionConcept?: { minConceptItem?: { name?: string } }[];
          }[];
        }[];
      }[];
    };

    const interactions: InteractionResult["interactions"] = [];
    for (const group of json.fullInteractionTypeGroup ?? []) {
      for (const type of group.fullInteractionType ?? []) {
        for (const pair of type.interactionPair ?? []) {
          interactions.push({
            drugs: (pair.interactionConcept ?? [])
              .map((c) => c.minConceptItem?.name)
              .filter((n): n is string => Boolean(n)),
            description: pair.description ?? "",
            severity: pair.severity ?? null,
          });
        }
      }
    }

    return {
      available: true,
      source: "RxNav (U.S. National Library of Medicine)",
      checked: resolved.map((r) => r.name),
      interactions,
    };
  } catch (error) {
    console.error("interaction check failed", error);
    return {
      available: false,
      reason: "The drug interaction data service is currently unavailable. Please try again later.",
      interactions: [],
    };
  }
}