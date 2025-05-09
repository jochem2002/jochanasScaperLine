export type FeedingDay = {
  day: number;
  food: string;
  dosage: string;
  target: string;
  notes: string;
};

export type FeedingSchema = FeedingDay[];

export const recoverySchema: FeedingSchema = [
  { day: 1, food: 'Matrine', dosage: '20 mg', target: 'Alle vissen', notes: 'Start antibacteriële ondersteuning' },
  { day: 2, food: 'Shrimp Sticks Chlorella', dosage: '1 stick', target: 'Amano + Cherry garnalen', notes: 'Plantaardig, ondersteunt darmflora' },
  { day: 3, food: 'Garlic', dosage: '20 mg', target: 'Alle vissen', notes: 'Stimuleert eetlust, mild antibacterieel' },
  { day: 4, food: 'Herbal + Chlorella', dosage: '30 mg + 30 mg', target: 'Alle vissen', notes: 'Darmgezondheid en immuunboost' },
  { day: 5, food: 'Rustdag', dosage: '—', target: '—', notes: 'Geen voer: rust voor het systeem' },
  { day: 6, food: 'Better Tabs', dosage: '1 tab', target: 'Otocinclus + Amano', notes: 'Laag belastend, voor bodemeters' },
  { day: 7, food: 'Forte', dosage: '20 mg', target: 'Alle vissen', notes: 'Versterkt weerstand' }
];

export const regularSchema: FeedingSchema = [
  { day: 1, food: 'Acai', dosage: '20 mg', target: 'Vissen', notes: 'Energie en kleurversterking' },
  { day: 2, food: 'Shrimp Sticks Chlorella + Better Tabs', dosage: '1 stick + 1 tab', target: 'Garnalen + Otocinclus', notes: 'Vezelrijk, geschikt voor bodemeters' },
  { day: 3, food: 'Garlic', dosage: '20 mg', target: 'Vissen', notes: 'Stimuleert voeropname' },
  { day: 4, food: 'Herbal + Chlorella', dosage: '30 mg + 30 mg', target: 'Vissen', notes: 'Ondersteunt darm en afweer' },
  { day: 5, food: 'Regular', dosage: '20 mg', target: 'Vissen', notes: 'Licht verteerbare basisdag' },
  { day: 6, food: 'Shrimp Sticks Acai', dosage: '1 stick', target: 'Bodemeters + garnalen', notes: 'Energieboost voor reinigers' },
  { day: 7, food: 'Rustdag', dosage: '—', target: '—', notes: 'Essentiële pauze' }
];
