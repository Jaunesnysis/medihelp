import axios from "axios";

export const fetchMedicineData = async (name) => {
  const response = await axios.get(`https://api.fda.gov/drug/label.json`, {
    params: {
      search: `openfda.brand_name:"${name}"`,
      limit: 1,
    },
  });

  const result = response.data.results[0];

  const raw = [
    result.purpose?.[0],
    result.dosage_and_administration?.[0],
    result.adverse_reactions?.[0],
    result.warnings?.[0],
  ]
    .filter(Boolean)
    .join("\n");

  return raw;
};
