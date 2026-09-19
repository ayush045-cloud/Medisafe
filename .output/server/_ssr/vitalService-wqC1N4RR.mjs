import { t as backendApi } from "./backendApi-D4N829Mm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vitalService-wqC1N4RR.js
async function getVitals(limit = 200) {
	return (await backendApi.get("/vitals")).data.slice(0, limit);
}
async function createVital(input) {
	return (await backendApi.post("/vitals", input)).data;
}
async function deleteVital(id) {
	await backendApi.delete(`/vitals/${id}`);
}
var REFERENCE_RANGES = {
	systolic: {
		min: 90,
		max: 140,
		label: "Systolic blood pressure",
		unit: "mmHg"
	},
	diastolic: {
		min: 60,
		max: 90,
		label: "Diastolic blood pressure",
		unit: "mmHg"
	},
	heart_rate: {
		min: 60,
		max: 100,
		label: "Resting heart rate",
		unit: "bpm"
	},
	oxygen_saturation: {
		min: 95,
		max: 100,
		label: "Oxygen saturation",
		unit: "%"
	},
	temperature: {
		min: 36.1,
		max: 37.8,
		label: "Body temperature",
		unit: "°C"
	},
	blood_glucose: {
		min: 4,
		max: 11,
		label: "Blood glucose",
		unit: "mmol/L"
	}
};
function checkVitalRanges(vital) {
	const out = [];
	const check = (value, key) => {
		if (value === null || value === void 0) return;
		const range = REFERENCE_RANGES[key];
		if (value < range.min || value > range.max) out.push(`${range.label} (${value} ${range.unit}) is outside the configured reference range of ${range.min}–${range.max} ${range.unit}.`);
	};
	check(vital.blood_pressure_systolic, "systolic");
	check(vital.blood_pressure_diastolic, "diastolic");
	check(vital.heart_rate, "heart_rate");
	check(vital.oxygen_saturation, "oxygen_saturation");
	check(vital.temperature, "temperature");
	check(vital.blood_glucose, "blood_glucose");
	return out;
}
//#endregion
export { getVitals as a, deleteVital as i, checkVitalRanges as n, createVital as r, REFERENCE_RANGES as t };
