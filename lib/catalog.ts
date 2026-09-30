export type ProductFocus = "Recovery" | "Metabolic" | "Cellular" | "Longevity" | "Blends" | "Neuro";

export type ProductVariant = {
  size: string;
  sku: string;
  price: number;
  compareAt?: number;
  soldOut?: boolean;
};

export type CoaReport = {
  file: string;
  report: string;
  lot: string;
  purity: string;
  date: string;
  method: string;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  focus: ProductFocus;
  summary: string;
  variants: ProductVariant[];
  size: string;
  price: number;
  purity: string;
  coa?: CoaReport;
  comingSoon?: boolean;
};

const make = (slug: string, name: string, focus: ProductFocus, summary: string, variants: ProductVariant[], coa?: CoaReport, comingSoon = false): CatalogProduct => ({
  slug, name, focus, summary, variants, coa, comingSoon,
  size: variants.map((variant) => variant.size).join(" / "),
  price: Math.min(...variants.map((variant) => variant.price)),
  purity: coa?.purity ?? "Pending",
});

const report = (file: string, reportId: string, lot: string, purity: string, date: string): CoaReport => ({
  file, report: reportId, lot, purity, date, method: "HPLC-UV / LAL",
});

export const catalogue: CatalogProduct[] = [
  make("retatrutide", "Retatrutide", "Metabolic", "A triple-receptor agonist research material for controlled metabolic signalling studies.", [
    { size: "10 mg", sku: "VIT-RETA-10", price: 119.99 }, { size: "20 mg", sku: "VIT-RETA-20", price: 209.99 }, { size: "30 mg", sku: "VIT-RETA-30", price: 289.99 },
  ], report("BW-RETA-10-040626-01_edited.pdf", "BW-RETA-10-040626-01", "BW-RETA-10-040626-01", "99.43%", "Sep 10, 2026")),
  make("bpc-157", "BPC-157", "Recovery", "A synthetic peptide supplied for laboratory research into tissue-repair signalling and resilience pathways.", [
    { size: "5 mg", sku: "VIT-BPC157-5", price: 49.99, compareAt: 59.99 }, { size: "10 mg", sku: "VIT-BPC157-6", price: 79.99, compareAt: 99.99 },
  ]),
  make("tb-500", "TB-500", "Recovery", "A thymosin beta-4 fragment used in preclinical research concerning cell migration and repair pathways.", [
    { size: "5 mg", sku: "VIT-TB500-5", price: 59.99, soldOut: true }, { size: "10 mg", sku: "VIT-TB500-10", price: 99.99 },
  ], report("BW-TB500-5mg-050926-01.pdf", "BW-TB500-5mg-050926-01", "VTL-TB5005", "99.02%", "Sep 17, 2026")),
  make("wolverine-blend", "Wolverine Blend (BPC-157 + TB-500)", "Blends", "A paired research format combining BPC-157 and TB-500 for multi-pathway recovery studies.", [
    { size: "10 mg", sku: "VTL-WOL1010X", price: 89.99, compareAt: 99.99 }, { size: "20 mg", sku: "VTL-WOL2010X", price: 159.99 },
  ], report("BW-BPC1-10-040626-2-01_edited.pdf", "BW-BPC1-10-040626-2-01", "BW-BPC1-10-040626-2-01", "99.68%", "Sep 8, 2026")),
  make("cjc-1295-ipamorelin", "CJC-1295 & Ipamorelin Blend", "Blends", "A dual-compound format for controlled growth-hormone signalling research.", [
    { size: "10 mg", sku: "VIT-CJCIPA-10", price: 89.99 },
  ], report("BW-CJCI-10-040626-01_edited.pdf", "BW-CJCI-10-040626-01", "BW-CJCI-10-040626-01", "99.57%", "Sep 8, 2026")),
  make("ghk-cu", "GHK-Cu (Copper)", "Longevity", "A copper-binding tripeptide for research into extracellular matrix and cellular signalling.", [
    { size: "50 mg", sku: "VIT-GHKCU-50", price: 49.99 }, { size: "100 mg", sku: "VIT-GHKCU-100", price: 79.99 },
  ], report("BW-GHKC-100-040626-01_edited.pdf", "BW-GHKC-100-040626-01", "BW-GHKC-100-040626-01", "99.84%", "Sep 8, 2026")),
  make("glow70-blend", "GLOW70 Blend", "Blends", "A multi-component research blend prepared for coordinated skin and tissue pathway studies.", [
    { size: "70 mg", sku: "VIT-GLOW70", price: 149.99, compareAt: 159.99 },
  ], report("BW-GLOW-70-040626-01_edited.pdf", "BW-GLOW-70-040626-01", "BW-GLOW-70-040626-01", "99.94%", "Sep 8, 2026")),
  make("klow80-blend", "KLOW80 Blend", "Blends", "A high-mass blended research format for structured multi-compound protocols.", [
    { size: "80 mg", sku: "VIT-KLOW80", price: 189.99, compareAt: 199.99 },
  ], report("BW-KLOW-80-040626-01_edited.pdf", "BW-KLOW-80-040626-01", "BW-KLOW-80-040626-01", "98.67%", "Sep 8, 2026")),
  make("5-amino-1mq", "5-Amino-1MQ", "Metabolic", "A small-molecule research material for investigation of NNMT-related metabolic pathways.", [
    { size: "50 mg", sku: "VIT-5AMINO-50", price: 159.99, soldOut: true },
  ], undefined, true),
  make("aod-9604", "AOD9604", "Metabolic", "A peptide fragment supplied for laboratory research into lipid-metabolism signalling.", [
    { size: "5 mg", sku: "VTL-AOD1010X", price: 99.99 }, { size: "10 mg", sku: "VTL-AOD0510X", price: 169.99, soldOut: true },
  ], report("BW-AOD-10mg-050926-01_edited.pdf", "BW-AOD-10mg-050926-01", "VTL-AOD10102", "99.95%", "Sep 17, 2026")),
  make("cjc-1295-no-dac", "CJC-1295 no DAC", "Cellular", "A short-acting GHRH analogue for controlled peptide signalling studies.", [
    { size: "5 mg", sku: "VTL-CJC0510X", price: 39.99, compareAt: 59.99 },
  ], report("BW-CJCN-5mg-050926-01_edited.pdf", "BW-CJCN-5mg-050926-01", "VTL-CJC05102", "99.74%", "Sep 17, 2026")),
  make("ipamorelin", "Ipamorelin", "Cellular", "A selective growth-hormone secretagogue research peptide for receptor-response studies.", [
    { size: "10 mg", sku: "VTL-IPA1010X", price: 49.99, compareAt: 89.99 },
  ], report("BW-IPA-10mg-050926-01_edited.pdf", "BW-IPA-10mg-050926-01", "VTL-IPA10102", "99.91%", "Sep 17, 2026")),
  make("dsip", "DSIP", "Neuro", "A neuropeptide research material for experimental sleep and stress-response models.", [
    { size: "5 mg", sku: "VIT-DSIP-5", price: 69.99 },
  ]),
  make("ss-31", "SS-31 (Elamipretide)", "Cellular", "A mitochondria-targeting peptide for cellular energy and oxidative-stress research.", [
    { size: "40 mg", sku: "VIT-SS31-40", price: 169.99, compareAt: 189.99 },
  ]),
  make("epitalon", "Epitalon", "Longevity", "A tetrapeptide supplied for research into cellular ageing and telomere-associated pathways.", [
    { size: "10 mg", sku: "VIT-EPIT-10", price: 84.99 },
  ], report("BW-EPI-10mg-050926-01_edited.pdf", "BW-EPI-10mg-050926-01", "VTL-EPI70101", "99.18%", "Sep 17, 2026")),
  make("tirzepatide", "Tirzepatide", "Metabolic", "A dual-receptor agonist research material for metabolic signalling models.", [
    { size: "10 mg", sku: "VIT-TIRZ-10", price: 69.99 }, { size: "20 mg", sku: "VIT-TIRZ-20", price: 119.99, soldOut: true },
  ], report("BW-TIRZ-10mg-050926-01.pdf", "BW-TIRZ-10mg-050926-01", "VTL-TIR10102", "99.47%", "Sep 17, 2026")),
  make("glutathione", "Glutathione", "Cellular", "A tripeptide antioxidant research material for redox and oxidative-stress studies.", [
    { size: "1500 mg", sku: "VIT-GLUTA-1500", price: 99.99 },
  ], report("BW-LGLU-1500mg-050926-01_edited.pdf", "BW-LGLU-1500mg-050926-01", "VTL-GLU1500102", "99.96%", "Sep 17, 2026")),
  make("igf-1", "IGF-1", "Cellular", "A growth-factor research material for controlled cell-growth and signalling studies.", [
    { size: "1 mg", sku: "VTL-IGF0110X", price: 189.99 },
  ], report("BW-ILGF3-1mg-050926-01_edited.pdf", "BW-ILGF3-1mg-050926-01", "VTL-IGF01102", "96.87%", "Sep 17, 2026")),
  make("kisspeptin", "Kisspeptin", "Neuro", "A signalling peptide for controlled endocrine and reproductive-axis research models.", [
    { size: "10 mg", sku: "VIT-KISS-10", price: 79.99 },
  ]),
  make("kpv", "KPV", "Recovery", "A short alpha-MSH-derived peptide for inflammatory-response and barrier research.", [
    { size: "10 mg", sku: "VTL-KPV1010X", price: 99.99 },
  ], report("BW-KPV-10mg-050926-01_edited.pdf", "BW-KPV-10mg-050926-01", "VTL-KPV10102", "99.74%", "Sep 17, 2026")),
  make("melanotan-ii", "Melanotan II", "Cellular", "A melanocortin analogue supplied for receptor-response research.", [
    { size: "10 mg", sku: "VIT-MT2-10", price: 69.99 },
  ], report("BW-MELA-10mg-050926-01_edited.pdf", "BW-MELA-10mg-050926-01", "VTL-MT210102", "99.91%", "Sep 17, 2026")),
  make("mots-c", "MOTS-C", "Cellular", "A mitochondrial-derived peptide for research into metabolic adaptation and cellular energy.", [
    { size: "10 mg", sku: "VIT-MOTSC-10", price: 59.99 }, { size: "40 mg", sku: "VIT-MOTSC-40", price: 189.99 },
  ], report("BW-MOTS-10-040626-01_edited.pdf", "BW-MOTS-10-040626-01", "BW-MOTS-10-040626-01", "98.54%", "Sep 8, 2026")),
  make("nad-plus", "NAD+", "Longevity", "A central cellular cofactor supplied for energy-metabolism and redox research.", [
    { size: "500 mg", sku: "VIT-NAD-500", price: 99.99 }, { size: "1000 mg", sku: "VIT-NAD-1000", price: 159.99 },
  ], report("BW-NAD+-500mg-050926-01_edited.pdf", "BW-NAD+-500mg-050926-01", "VTL-NAD500102", "97.33%", "Sep 17, 2026")),
  make("pt-141", "PT-141", "Neuro", "A melanocortin receptor agonist research peptide for neuroendocrine signalling studies.", [
    { size: "10 mg", sku: "VIT-PT141-10", price: 89.99 },
  ], report("BW-PT141-10mg-050926-01_edited.pdf", "BW-PT141-10mg-050926-01", "VTL-PT110102", "99.64%", "Sep 17, 2026")),
  make("semax", "Semax", "Neuro", "A synthetic neuropeptide analogue for laboratory research into neural signalling pathways.", [
    { size: "10 mg", sku: "VIT-SEMAX-10", price: 69.99 },
  ], report("BW-SEMAX-10mg-050926-01_edited.pdf", "BW-SEMAX-10mg-050926-01", "VTL-SEM10103", "99.94%", "Sep 17, 2026")),
  make("selank", "Selank", "Neuro", "A synthetic regulatory peptide for experimental neuro-signalling and stress-response research.", [
    { size: "10 mg", sku: "VIT-SELANK-5", price: 69.99 },
  ], report("BW-SEL-10mg-050926-01_edited.pdf", "BW-SEL-10mg-050926-01", "VTL-SEL10102", "99.73%", "Sep 17, 2026")),
  make("tesamorelin", "Tesamorelin", "Metabolic", "A GHRH analogue supplied for controlled endocrine and metabolic pathway research.", [
    { size: "10 mg", sku: "VIT-TESA-10", price: 189.99 },
  ], report("BW-TESA-10mg-050926-01.pdf", "BW-TESA-10mg-050926-01", "VTL-TES10102", "99.67%", "Sep 17, 2026")),
  make("thymosin-alpha-1", "Thymosin Alpha-1", "Recovery", "An immune-modulating peptide supplied for laboratory signalling and response studies.", [
    { size: "10 mg", sku: "VIT-TA1-10", price: 89.99 },
  ], report("BW-TA1-10mg-050926-01.pdf", "BW-TA1-10mg-050926-01", "VTL-TA10102", "99.49%", "Sep 17, 2026")),
];

export const coaRows = catalogue.flatMap((product) => product.coa ? [{
  product: product.name,
  lot: product.coa.lot,
  report: product.coa.report,
  purity: product.coa.purity,
  method: product.coa.method,
  date: product.coa.date,
  url: `/coas/${encodeURIComponent(product.coa.file)}`,
}] : []);
