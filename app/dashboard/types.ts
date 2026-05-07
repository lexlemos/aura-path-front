export type Medication = {
  name: string;
  form: string;
  frequency: string;
};

export type PatientData = {
  id: string;
  status: string;
  age: string;
  gender: string;
  symptoms: string[];
  medications: Medication[];
  bp: string;
  pulse: string;
};

export const INITIAL_PATIENT: PatientData = {
  id: "PT-88294-M",
  status: "Estável",
  age: "58",
  gender: "Masculino",
  symptoms: ["Cefaleia Grave", "Tosse Seca"],
  medications: [
    {
      name: "Lisinopril",
      form: "Comprimido Oral 20mg",
      frequency: "Diário (Manhã)",
    },
    {
      name: "Ibuprofeno",
      form: "400mg Se necessário",
      frequency: "Se necessário",
    },
  ],
  bp: "134/88",
  pulse: "72",
};
