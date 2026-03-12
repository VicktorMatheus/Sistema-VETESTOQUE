// ════════════════════════════════════════════
// DADOS INICIAIS DO ESTOQUE
//
// Cada produto tem:
//   - nome:  nome + concentração (sem abreviação de embalagem)
//   - tipo:  o que é a embalagem (ampola, frasco, comprimido...)
//   - qtdEmb: quantidade por embalagem (ex: 50ml, 2ml, 10cp...)
//   - lotes: lista de lotes com qty, validade, lote, marca
//
// Abreviações usadas para identificar tipo e qtd:
//   amp / ampola → ampola
//   fr / frasco  → frasco
//   fr-amp       → frasco-ampola
//   cp / comp    → comprimido
//   cx           → caixa
//   tab          → unidade (comprimido/tablete)
//   sache / pó   → pacote
//   bolsa        → bolsa (soro, metronidazol)
//   gotas / susp → frasco (suspensão oral)
// ════════════════════════════════════════════
const rawData = [

  // ── ANESTÉSICOS / SEDATIVOS ─────────────────────────────────
  { nome: "KETAMINA 10%", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 727, validade: "2027-09-01", lote: "", marca: "DECHA" },
    { qty: 715, validade: "2027-09-01", lote: "", marca: "AGENER" }
  ]},
  { nome: "ACEPRAN 1%", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 0,   validade: "",           lote: "", marca: "" }
  ]},
  { nome: "ACEPRAN 1%", tipo: "frasco", qtdEmb: "10ml gotas", lotes: [
    { qty: 1,   validade: "2026-11-01", lote: "", marca: "" }
  ]},
  { nome: "ACEPRAN 1%", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 186, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "XYLASINA 2%", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 3,   validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "XYLASINA 2%", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 120, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "PROPOFOL 10mg/ml", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 27, validade: "2027-01-01", lote: "", marca: "" }
  ]},
  { nome: "ISOFLURANO", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 3, validade: "2027-05-01", lote: "", marca: "" },
    { qty: 5, validade: "2027-11-01", lote: "", marca: "" }
  ]},
  { nome: "T61", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "DETOMIDINA 1%", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 1, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "IOIMBINA 10mg/ml", tipo: "frasco", qtdEmb: "30/50ml", lotes: [
    { qty: 19, validade: "2027-10-01", lote: "", marca: "" }
  ]},

  // ── OPIOIDES / ANALGÉSICOS ──────────────────────────────────
  { nome: "MORFINA 10mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 9180, validade: "2027-12-01", lote: "", marca: "" }
  ]},
  { nome: "METADONA 10mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 190, validade: "2027-03-01", lote: "", marca: "" },
    { qty: 75,  validade: "2027-10-01", lote: "", marca: "" },
    { qty: 625, validade: "2028-01-01", lote: "", marca: "" }
  ]},
  { nome: "METADONA 10mg", tipo: "comprimido", qtdEmb: "blíster", lotes: [
    { qty: 20, validade: "2026-06-01", lote: "", marca: "" }
  ]},
  { nome: "TRAMADOL 100mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 889, validade: "2028-09-01", lote: "", marca: "" }
  ]},
  { nome: "TRAMADOL 50mg", tipo: "comprimido", qtdEmb: "10 comp", lotes: [
    { qty: 9,   validade: "2026-03-01", lote: "", marca: "" },
    { qty: 10,  validade: "2026-05-01", lote: "", marca: "" },
    { qty: 10,  validade: "2026-06-01", lote: "", marca: "" },
    { qty: 260, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "FENTANILO 0,5mg/ml", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "DIPIRONA 500mg/ml", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 293, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "DIPIRONA 500mg", tipo: "comprimido", qtdEmb: "10 comp", lotes: [
    { qty: 126, validade: "2027-08-01", lote: "", marca: "" }
  ]},

  // ── BENZODIAZEPÍNICOS / ANTICONVULSIVANTES ──────────────────
  { nome: "DIAZEPAM 5mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 4326,  validade: "2026-05-01", lote: "", marca: "Teuto" },
    { qty: 5093,  validade: "2027-06-01", lote: "", marca: "Hipolabor" },
    { qty: 500,   validade: "2027-10-01", lote: "", marca: "Santisa" },
    { qty: 18492, validade: "2028-01-01", lote: "", marca: "Santisa", obs: "troca" }
  ]},
  { nome: "FENOBARBITAL 100mg", tipo: "comprimido", qtdEmb: "10 comp", lotes: [
    { qty: 200, validade: "2027-05-01", lote: "", marca: "" },
    { qty: 600, validade: "2027-06-01", lote: "", marca: "" },
    { qty: 400, validade: "2027-07-01", lote: "", marca: "" },
    { qty: 180, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "FENOBARBITAL 100mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 1,  validade: "2026-04-01", lote: "", marca: "" },
    { qty: 48, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "FENOBARBITAL 40mg/ml", tipo: "frasco", qtdEmb: "20ml gotas", lotes: [
    { qty: 3, validade: "2026-11-01", lote: "", marca: "" }
  ]},
  { nome: "GABAPENTINA 300mg", tipo: "comprimido", qtdEmb: "blíster", lotes: [
    { qty: 30, validade: "2027-03-01", lote: "", marca: "" }
  ]},
  { nome: "QUETIAPINA 25mg", tipo: "comprimido", qtdEmb: "blíster", lotes: [
    { qty: 23, validade: "2027-01-01", lote: "", marca: "" }
  ]},

  // ── PSICOFÁRMACOS / APETITE ─────────────────────────────────
  { nome: "AMITRIPTILINA 75mg", tipo: "comprimido", qtdEmb: "30 comp", lotes: [
    { qty: 78, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "MIRTAZAPINA 2mg/ml", tipo: "frasco", qtdEmb: "30ml suspensão", lotes: [
    { qty: 1, validade: "2026-05-01", lote: "", marca: "" }
  ]},
  { nome: "MIRTAZAPINA 15mg", tipo: "comprimido", qtdEmb: "unidade", lotes: [
    { qty: 6, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "COBAVITAL 1mg+4mg", tipo: "comprimido", qtdEmb: "unidade", lotes: [
    { qty: 8, validade: "2026-08-01", lote: "", marca: "" }
  ]},
  { nome: "APEVITIM", tipo: "frasco", qtdEmb: "240ml oral", lotes: [
    { qty: 2, validade: "2027-05-01", lote: "", marca: "" }
  ]},

  // ── ANESTÉSICOS LOCAIS ──────────────────────────────────────
  { nome: "LIDOCAÍNA 2% c/ vasoconstritor", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 6, validade: "2027-03-01", lote: "", marca: "" },
    { qty: 6, validade: "2027-04-01", lote: "", marca: "" },
    { qty: 6, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "LIDOCAÍNA 2% s/ vasoconstritor", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 10, validade: "2026-11-01", lote: "", marca: "" },
    { qty: 10, validade: "2028-03-01", lote: "", marca: "" }
  ]},

  // ── EMERGÊNCIA / CARDIOVASCULAR ─────────────────────────────
  { nome: "ADRENALINA 50mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 9,   validade: "2026-11-01", lote: "", marca: "" },
    { qty: 39,  validade: "2027-07-01", lote: "", marca: "" },
    { qty: 700, validade: "2027-03-01", lote: "", marca: "" }
  ]},
  { nome: "ATROPINA 1%", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 7, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "ATROPINA 10%", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 3, validade: "2026-04-01", lote: "", marca: "" }
  ]},
  { nome: "ATROPINA 0,25mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 192, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "EFEDRINA 50mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 1, validade: "2026-04-01", lote: "", marca: "" }
  ]},
  { nome: "NALOXONA 0,4mg/ml", tipo: "ampola", qtdEmb: "1ml", lotes: [
    { qty: 28, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "FUROSEMIDA 40mg", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 320, validade: "2026-09-01", lote: "", marca: "" }
  ]},
  { nome: "FUROSEMIDA 10mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 212, validade: "2027-06-01", lote: "", marca: "" }
  ]},

  // ── SOLUÇÕES / SOROS ────────────────────────────────────────
  { nome: "ÁGUA PARA INJEÇÃO", tipo: "ampola", qtdEmb: "10ml", lotes: [
    { qty: 5,   validade: "2026-09-01", lote: "", marca: "" },
    { qty: 5,   validade: "2027-01-01", lote: "", marca: "" },
    { qty: 50,  validade: "2027-03-01", lote: "", marca: "" },
    { qty: 130, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "SORO FISIOLÓGICO", tipo: "frasco", qtdEmb: "100ml bolsa", lotes: [
    { qty: 15, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "GLICOSE 25%", tipo: "ampola", qtdEmb: "10ml", lotes: [
    { qty: 295, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "CLORETO DE POTÁSSIO 19,1%", tipo: "ampola", qtdEmb: "10ml", lotes: [
    { qty: 455, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "SOROFARM (HERTAVITA)", tipo: "frasco-ampola", qtdEmb: "500ml", lotes: [
    { qty: 6, validade: "2027-09-01", lote: "", marca: "" },
    { qty: 2, validade: "2026-06-01", lote: "", marca: "" }
  ]},

  // ── ANTIEMÉTICOS / GÁSTRICOS ────────────────────────────────
  { nome: "ONDANSETRONA 2mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 453, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "ONDANSETRONA 1%", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 20, validade: "2027-03-01", lote: "", marca: "" }
  ]},
  { nome: "CERENIA (maropitant)", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 1, validade: "2028-06-01", lote: "", marca: "" }
  ]},
  { nome: "METOCLOPRAMIDA 5mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 69, validade: "2027-03-01", lote: "", marca: "" }
  ]},
  { nome: "PROMETAZINA 25mg/ml", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 121, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "OMEPRAZOL 40mg/ml", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 0, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "OMEPRAZOL 20mg", tipo: "comprimido", qtdEmb: "56 comp", lotes: [
    { qty: 672, validade: "2026-05-01", lote: "", marca: "" }
  ]},
  { nome: "SUCRALFATO", tipo: "frasco", qtdEmb: "10ml oral", lotes: [
    { qty: 20, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "SIMETICONA", tipo: "frasco", qtdEmb: "15ml gotas", lotes: [
    { qty: 1, validade: "2027-08-01", lote: "", marca: "" },
    { qty: 1, validade: "2027-07-01", lote: "", marca: "" },
    { qty: 8, validade: "2026-11-01", lote: "", marca: "" }
  ]},
  { nome: "METRONIDAZOL 0,5%", tipo: "frasco", qtdEmb: "100ml bolsa", lotes: [
    { qty: 21, validade: "2026-10-01", lote: "", marca: "" }
  ]},
  { nome: "METRONIDAZOL 250mg", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 800, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "LACTULOSE", tipo: "frasco", qtdEmb: "120ml", lotes: [
    { qty: 11, validade: "2027-03-01", lote: "", marca: "" }
  ]},

  // ── HEMOSTÁTICOS / ANTIINFLAMATÓRIOS ────────────────────────
  { nome: "ÁCIDO TRANEXÂMICO 50mg/ml", tipo: "ampola", qtdEmb: "5ml", lotes: [
    { qty: 423, validade: "2027-05-01", lote: "", marca: "" },
    { qty: 70,  validade: "2028-07-01", lote: "", marca: "" },
    { qty: 3,   validade: "2026-10-01", lote: "", marca: "" }
  ]},
  { nome: "ÁCIDO TRANEXÂMICO 250mg/ml", tipo: "comprimido", qtdEmb: "blíster 5 comp", lotes: [
    { qty: 12, validade: "2026-10-01", lote: "", marca: "" }
  ]},
  { nome: "MELOXICAM 2%", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 727, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "MELOXICAM 2mg", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 200, validade: "2026-05-01", lote: "", marca: "" }
  ]},
  { nome: "CARPROFENO 100mg", tipo: "comprimido", qtdEmb: "14 comp", lotes: [
    { qty: 1, validade: "2026-08-01", lote: "", marca: "" }
  ]},
  { nome: "FLUNIXIM MEGLUMINA 50mg/ml (Banamine)", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 4, validade: "2026-08-01", lote: "", marca: "" }
  ]},
  { nome: "BUSCAPINA COMPOSTA", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 5, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "DEXAMETASONA 20mg", tipo: "frasco-ampola", qtdEmb: "50/100ml", lotes: [
    { qty: 21, validade: "2027-08-01", lote: "", marca: "" }
  ]},
  { nome: "PREDNISONA 20mg", tipo: "comprimido", qtdEmb: "10 comp", lotes: [
    { qty: 360, validade: "2027-04-01", lote: "", marca: "" },
    { qty: 380, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "PREDNISONA 5mg", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 0,   validade: "", lote: "", marca: "" },
    { qty: 290, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "BROMEXINA (Aliv) 50ml", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 9, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "ACETILCISTEÍNA 100mg/ml", tipo: "ampola", qtdEmb: "cx 5 ampolas 2ml", lotes: [
    { qty: 22, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "ACETILCISTEÍNA 40mg/ml", tipo: "frasco", qtdEmb: "120ml xarope", lotes: [
    { qty: 4, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "TUSSEDAN", tipo: "frasco", qtdEmb: "100ml xarope", lotes: [
    { qty: 17, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "OCITOCINA", tipo: "frasco-ampola", qtdEmb: "10/50ml", lotes: [
    { qty: 3, validade: "2027-06-01", lote: "", marca: "" }
  ]},

  // ── VITAMINAS / SUPLEMENTOS ─────────────────────────────────
  { nome: "VIT. B12 (Cianocobalamina)", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 1,  validade: "2027-06-01", lote: "", marca: "" },
    { qty: 81, validade: "2027-08-01", lote: "", marca: "" }
  ]},
  { nome: "POLIVIN B12", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 14, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "VITAMINA K", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 3, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "COMPLEXO B", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "COMPLEXO B", tipo: "comprimido", qtdEmb: "100 comp", lotes: [
    { qty: 1480, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "CITONEURIM 5.000", tipo: "ampola", qtdEmb: "unidade", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "NEVRIX IM", tipo: "ampola", qtdEmb: "cx 3 ampolas", lotes: [
    { qty: 15, validade: "2027-10-01", lote: "", marca: "" },
    { qty: 1,  validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "VITAMINA C", tipo: "frasco-ampola", qtdEmb: "30ml inj.", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "VITAMINA C", tipo: "frasco", qtdEmb: "30ml gotas", lotes: [
    { qty: 1,  validade: "2026-05-01", lote: "", marca: "" },
    { qty: 2,  validade: "2026-11-01", lote: "", marca: "" },
    { qty: 2,  validade: "2027-03-01", lote: "", marca: "" },
    { qty: 13, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "ADE ORAL", tipo: "frasco", qtdEmb: "100ml", lotes: [
    { qty: 9, validade: "2026-11-01", lote: "", marca: "" }
  ]},
  { nome: "SULFATO FERROSO", tipo: "frasco", qtdEmb: "30ml gotas", lotes: [
    { qty: 24, validade: "2027-01-01", lote: "", marca: "" }
  ]},
  { nome: "FERRO", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 3, validade: "2026-10-01", lote: "", marca: "" },
    { qty: 4, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "HEMOFARM", tipo: "frasco", qtdEmb: "1000ml oral", lotes: [
    { qty: 4, validade: "2026-04-01", lote: "", marca: "" }
  ]},
  { nome: "ANTITÓXICO", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 13, validade: "2027-11-01", lote: "", marca: "" }
  ]},
  { nome: "ANTITÓXICO", tipo: "frasco", qtdEmb: "20ml gotas", lotes: [
    { qty: 6, validade: "2026-09-01", lote: "", marca: "" }
  ]},
  { nome: "CÁLCIO", tipo: "frasco-ampola", qtdEmb: "200ml", lotes: [
    { qty: 1, validade: "2027-04-01", lote: "", marca: "" },
    { qty: 4, validade: "2027-08-01", lote: "", marca: "" }
  ]},
  { nome: "VITAMINI 60g (Bepet)", tipo: "pacote", qtdEmb: "30 tabs", lotes: [
    { qty: 2, validade: "2027-01-01", lote: "", marca: "" },
    { qty: 4, validade: "2027-03-01", lote: "", marca: "" }
  ]},
  { nome: "CONDROITINA (Super Artro) 1000mg", tipo: "comprimido", qtdEmb: "60 tabs", lotes: [
    { qty: 12, validade: "2027-08-01", lote: "", marca: "" },
    { qty: 12, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "QUERATINE (Bepet)", tipo: "pacote", qtdEmb: "30 tabs", lotes: [
    { qty: 18, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "ÔMEGA 3 1000mg", tipo: "comprimido", qtdEmb: "120 comp", lotes: [
    { qty: 7, validade: "2027-11-01", lote: "", marca: "" }
  ]},
  { nome: "SILIMARINA 200mg", tipo: "comprimido", qtdEmb: "unidade", lotes: [
    { qty: 200, validade: "2026-03-01", lote: "", marca: "" }
  ]},
  { nome: "AMINOMIX PET (pó)", tipo: "pacote", qtdEmb: "500g pote", lotes: [
    { qty: 250, validade: "2026-10-01", lote: "", marca: "" }
  ]},
  { nome: "M.O.S. SUPLEM (pó)", tipo: "pacote", qtdEmb: "1kg pote", lotes: [
    { qty: 0, validade: "2027-01-01", lote: "", marca: "" }
  ]},
  { nome: "SUPL. VITAMÍNICO (Bepet)", tipo: "outro", qtdEmb: "13ml tubo", lotes: [
    { qty: 13, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "SUPL. VITAMÍNICO (Organew)", tipo: "outro", qtdEmb: "12ml tubo", lotes: [
    { qty: 39, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "SUPL. VITAMÍNICO (Organew)", tipo: "outro", qtdEmb: "32ml tubo", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},

  // ── ANTIBIÓTICOS ────────────────────────────────────────────
  { nome: "PENTABIÓTICO 6 Milhões", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 696, validade: "2028-08-01", lote: "", marca: "" }
  ]},
  { nome: "PENTAKEL", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 4, validade: "2026-09-01", lote: "", marca: "" }
  ]},
  { nome: "AMOXICILINA 15g (Agemoxi)", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 2, validade: "2027-04-01", lote: "", marca: "" },
    { qty: 5, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "AMOXICILINA 500mg", tipo: "comprimido", qtdEmb: "unidade", lotes: [
    { qty: 120, validade: "2027-03-01", lote: "", marca: "" },
    { qty: 21,  validade: "2027-08-01", lote: "", marca: "" }
  ]},
  { nome: "AMOXICILINA + CLAVULANATO 400+57mg/5ml", tipo: "frasco", qtdEmb: "70ml suspensão", lotes: [
    { qty: 20, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "AMOXICILINA + CLAVULANATO 500mg+125mg", tipo: "comprimido", qtdEmb: "blíster", lotes: [
    { qty: 9,  validade: "2027-06-01", lote: "", marca: "" },
    { qty: 90, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "AMOXICILINA + CLAVULANATO 1g+200mg", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 63, validade: "2026-10-01", lote: "", marca: "" }
  ]},
  { nome: "OXITETRACICLINA LA 20%", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 3, validade: "2026-11-01", lote: "", marca: "" }
  ]},
  { nome: "DOXICICLINA 100mg (palatável)", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 406, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "DOXICICLINA 100mg", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 1800, validade: "2027-05-01", lote: "", marca: "" },
    { qty: 1340, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "DOXICICLINA 4,6%", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 2, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "DOXICICLINA 300mg", tipo: "frasco", qtdEmb: "suspensão", lotes: [
    { qty: 1, validade: "2027-12-01", lote: "", marca: "" },
    { qty: 3, validade: "2028-05-01", lote: "", marca: "" }
  ]},
  { nome: "AMPICILINA 1000mg", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 34, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "CLINDAMICINA 150mg/ml", tipo: "ampola", qtdEmb: "4ml", lotes: [
    { qty: 26, validade: "2026-06-01", lote: "", marca: "" }
  ]},
  { nome: "AMICACINA 250mg", tipo: "ampola", qtdEmb: "2ml", lotes: [
    { qty: 31, validade: "2027-07-01", lote: "", marca: "" }
  ]},
  { nome: "TRISSULFIN (sulfa + trimetropim)", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 1, validade: "2026-05-01", lote: "", marca: "" },
    { qty: 2, validade: "2027-04-01", lote: "", marca: "" },
    { qty: 1, validade: "2027-08-01", lote: "", marca: "" },
    { qty: 4, validade: "2028-05-01", lote: "", marca: "" },
    { qty: 3, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "SULFA + TRIMETROPIM 200+40mg/5ml", tipo: "frasco", qtdEmb: "100ml suspensão", lotes: [
    { qty: 6, validade: "2027-04-01", lote: "", marca: "" }
  ]},
  { nome: "SULFA + TRIMETROPIM 400+80mg", tipo: "comprimido", qtdEmb: "blíster", lotes: [
    { qty: 600, validade: "2027-09-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 10%", tipo: "frasco-ampola", qtdEmb: "50ml", lotes: [
    { qty: 0, validade: "", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 50mg", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 200, validade: "2026-05-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 12,5mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 480, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 25mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 1635, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 50mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 350, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 75mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 833, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 100mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 523, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "ENROFLOXACINA 150mg + MELOXICAM", tipo: "comprimido", qtdEmb: "unidade manip.", lotes: [
    { qty: 40, validade: "2026-07-01", lote: "", marca: "" }
  ]},
  { nome: "CEF 50 (cefalosporina)", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 1, validade: "2027-10-01", lote: "", marca: "" }
  ]},
  { nome: "GENTAMICINA 4%", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 2, validade: "2027-02-01", lote: "", marca: "" }
  ]},
  { nome: "CEFTRIAXONA 1000mg", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 103, validade: "2027-11-01", lote: "", marca: "" }
  ]},
  { nome: "FLORFENICOL 300mg/ml", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 5, validade: "2026-08-01", lote: "", marca: "" }
  ]},
  { nome: "CEFALEXINA 250mg/5ml", tipo: "frasco", qtdEmb: "100ml suspensão", lotes: [
    { qty: 3, validade: "2026-08-01", lote: "", marca: "" },
    { qty: 3, validade: "2026-06-01", lote: "", marca: "" },
    { qty: 3, validade: "2027-05-01", lote: "", marca: "" }
  ]},
  { nome: "CEFALEXINA 500mg", tipo: "comprimido", qtdEmb: "10 comp", lotes: [
    { qty: 990, validade: "2027-08-01", lote: "", marca: "" }
  ]},
  { nome: "CEFAZOLINA 1g", tipo: "frasco-ampola", qtdEmb: "unidade", lotes: [
    { qty: 23, validade: "2027-06-01", lote: "", marca: "" }
  ]},
  { nome: "IMIZOL (imidocarb)", tipo: "frasco-ampola", qtdEmb: "15ml", lotes: [
    { qty: 4, validade: "2021-03-01", lote: "", marca: "" }
  ]},
  { nome: "SEDACOL", tipo: "frasco-ampola", qtdEmb: "100ml", lotes: [
    { qty: 1, validade: "2026-02-01", lote: "", marca: "" }
  ]},
  { nome: "VERRUTRAT", tipo: "frasco-ampola", qtdEmb: "20ml", lotes: [
    { qty: 2, validade: "2027-05-01", lote: "", marca: "" }
  ]},

  // ── ANTIPARASITÁRIOS / OUTROS ───────────────────────────────
  { nome: "VIVERAM", tipo: "frasco-ampola", qtdEmb: "10ml", lotes: [
    { qty: 17, validade: "2026-03-01", lote: "", marca: "" }
  ]},
  { nome: "CARVÃO ATIVADO (Carbovet)", tipo: "comprimido", qtdEmb: "20 comp", lotes: [
    { qty: 200, validade: "2026-08-01", lote: "", marca: "" }
  ]},
  { nome: "ENTEROBIO (probiótico)", tipo: "pacote", qtdEmb: "15g sachê", lotes: [
    { qty: 10, validade: "2027-05-01", lote: "", marca: "" },
    { qty: 70, validade: "2027-07-01", lote: "", marca: "" },
    { qty: 20, validade: "2027-08-01", lote: "", marca: "" }
  ]},
];

// ════════════════════════════════════════════
// ESTADO DA APLICAÇÃO
//
// Aqui ficam os dados que o sistema usa enquanto está rodando.
// Quando a página fecha, esses dados somem.
// (Para salvar permanente, precisaria de um banco de dados)
// ════════════════════════════════════════════

// Converte o rawData em produtos, mesclando automaticamente itens com
// mesmo nome + tipo + qtdEmb em um único produto com vários lotes.
//
// Por exemplo: dois registros de "ACEPRAN 1% / frasco-ampola / 20ml"
// viram um único produto com 2 lotes dentro dele.
let products = (() => {
  const mapa = new Map(); // chave = "nome|tipo|qtdEmb"
  let contadorId = 1;

  rawData.forEach((p, i) => {
    const chave = `${p.nome}|${p.tipo || 'outro'}|${p.qtdEmb || ''}`;

    if (!mapa.has(chave)) {
      // Primeiro registro com essa combinação — cria o produto
      mapa.set(chave, {
        id: contadorId++,
        nome: p.nome,
        tipo: p.tipo || 'outro',
        qtdEmb: p.qtdEmb || '',
        lotes: []
      });
    }

    const prod = mapa.get(chave);

    // Adiciona todos os lotes desse registro ao produto
    p.lotes.forEach((l, j) => {
      prod.lotes.push({
        id: prod.id * 1000 + prod.lotes.length, // ID único crescente
        qty: typeof l.qty === 'number' ? l.qty : 0,
        validade: l.validade || '',
        lote: l.lote || '',
        marca: l.marca || '',
        obs: l.obs || '',
      });
    });
  });

  return Array.from(mapa.values());
})();

// Lista de movimentos (entradas e saídas)
let movements = [];

// Controle da ordenação da tabela
let sortField = 'nome';
let sortDir   = 1; // 1 = crescente, -1 = decrescente

// Guarda qual modo o modal está (novo produto, entrada, saída, ver-lotes, editar-lote)
let modalMode = '';

// ════════════════════════════════════════════
// FUNÇÕES DE DATA E STATUS
// ════════════════════════════════════════════

// Data de hoje (zerada para comparar corretamente)
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

/**
 * Verifica o status de uma validade e devolve:
 * - 'vencido'  → já passou da data
 * - 'alerta'   → vence nos próximos 90 dias
 * - 'ok'       → ainda tem bastante tempo
 * - 'sem-data' → não foi informada validade
 */
function getStatus(valStr) {
  if (!valStr) return 'sem-data';
  const d = new Date(valStr);
  if (isNaN(d)) return 'sem-data';
  const diasRestantes = (d - hoje) / (1000 * 60 * 60 * 24);
  if (diasRestantes < 0)   return 'vencido';
  if (diasRestantes <= 90) return 'alerta';
  return 'ok';
}

/**
 * Formata uma data de "2026-05-01" para "01/05/2026"
 */
function fmtDate(valStr) {
  if (!valStr) return '—';
  const d = new Date(valStr + 'T12:00:00'); // evita bug de fuso horário
  if (isNaN(d)) return valStr;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Cria o badge colorido de validade
 * Ex: badge verde com "01/05/2027"
 */
function statusBadge(valStr) {
  const s = getStatus(valStr);
  return `<span class="badge ${s}"><span class="dot"></span>${fmtDate(valStr)}</span>`;
}

/**
 * Define a classe CSS da quantidade (verde, amarelo ou cinza)
 */
function qtyClass(q) {
  if (q === 0)  return 'zero';
  if (q <= 5)   return 'low';
  return 'ok';
}

/**
 * Calcula a quantidade total de um produto somando todos os lotes
 */
function totalQty(produto) {
  return produto.lotes.reduce((soma, l) => soma + l.qty, 0);
}

/**
 * Pega a validade mais próxima entre os lotes COM estoque (qty > 0).
 * Lotes zerados são ignorados — não faz sentido mostrar validade de algo vazio.
 */
function proximaValidade(produto) {
  const datas = produto.lotes
    .filter(l => l.qty > 0)          // só lotes com estoque
    .map(l => l.validade)
    .filter(v => v)
    .map(v => new Date(v))
    .filter(d => !isNaN(d));
  if (!datas.length) return '';
  return new Date(Math.min(...datas)).toISOString().split('T')[0];
}

/**
 * O pior status entre os lotes COM estoque.
 * Lotes zerados não contam — produto zerado mostra sem-data.
 */
function piorStatus(produto) {
  const ordem = { vencido: 0, alerta: 1, ok: 2, 'sem-data': 3 };
  const lotesAtivos = produto.lotes.filter(l => l.qty > 0);
  if (!lotesAtivos.length) return 'sem-data';
  return lotesAtivos
    .map(l => getStatus(l.validade))
    .sort((a, b) => ordem[a] - ordem[b])[0];
}

// ════════════════════════════════════════════
// ATUALIZAR OS NÚMEROS DO CABEÇALHO
// ════════════════════════════════════════════
function updateStats() {
  const total  = products.length;
  const vencidos = products.filter(p => piorStatus(p) === 'vencido').length;
  const alertas  = products.filter(p => piorStatus(p) === 'alerta').length;
  const zeros    = products.filter(p => totalQty(p) === 0).length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-venc').textContent  = vencidos;
  document.getElementById('stat-warn').textContent  = alertas;
  document.getElementById('stat-zero').textContent  = zeros;
}

// ════════════════════════════════════════════
// RENDERIZAR A TABELA DE PRODUTOS
// Essa função é chamada toda vez que algo muda
// ════════════════════════════════════════════
function renderTable() {
  const busca      = document.getElementById('search').value.toLowerCase();
  const filtroStatus = document.getElementById('filter-status').value;
  const filtroTipo   = document.getElementById('filter-tipo').value;

  // Filtra os produtos conforme busca e filtros
  let dados = products.filter(p => {
    // Verifica se o nome, lote ou marca batem com a busca
    const lotesTexto = p.lotes.map(l => `${l.lote} ${l.marca}`).join(' ').toLowerCase();
    const bate = p.nome.toLowerCase().includes(busca) || lotesTexto.includes(busca);

    // Aplica o filtro de status
    let statusOk = true;
    if (filtroStatus === 'vencido') statusOk = piorStatus(p) === 'vencido';
    else if (filtroStatus === 'alerta') statusOk = piorStatus(p) === 'alerta';
    else if (filtroStatus === 'ok')     statusOk = piorStatus(p) === 'ok';
    else if (filtroStatus === 'zero')   statusOk = totalQty(p) === 0;

    // Aplica o filtro de tipo
    const tipoOk = !filtroTipo || p.tipo === filtroTipo;

    return bate && statusOk && tipoOk;
  });

  // Ordena pelos campos
  dados.sort((a, b) => {
    if (sortField === 'nome')     return sortDir * a.nome.localeCompare(b.nome);
    if (sortField === 'tipo')     return sortDir * a.tipo.localeCompare(b.tipo);
    if (sortField === 'qty')      return sortDir * (totalQty(a) - totalQty(b));
    if (sortField === 'validade') {
      const da = proximaValidade(a) || '9999';
      const db = proximaValidade(b) || '9999';
      return sortDir * da.localeCompare(db);
    }
    return 0;
  });

  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');

  // Se não achou nada, mostra mensagem de "vazio"
  empty.style.display = dados.length ? 'none' : 'block';

  // Uma linha por produto — sem sub-linhas de lote na tabela.
  // Se quiser ver os lotes, clica no badge "X lotes" que abre um modal.
  tbody.innerHTML = dados.map(p => {
    const qty     = totalQty(p);
    const valPrin = proximaValidade(p);

    // Conta quantos lotes têm quantidade > 0 (lotes zerados não contam)
    const lotesAtivos = p.lotes.filter(l => l.qty > 0);
    const temMultiLote = lotesAtivos.length > 1;

    return `
      <tr class="produto-row">
        <td class="nome-produto">
          <div class="nome-linha">
            <span class="nome-texto">${p.nome}</span>
            ${p.qtdEmb ? `<span class="nome-emb">${p.qtdEmb}</span>` : ''}
            ${temMultiLote
              ? `<button class="btn-toggle-lotes" onclick="openModal('ver-lotes', ${p.id})"
                  title="Ver lotes separados">▼ ${lotesAtivos.length} lotes</button>`
              : ''
            }
          </div>
        </td>
        <td class="col-tipo"><span class="badge-tipo">${p.tipo}</span></td>
        <td class="qty-cell ${qtyClass(qty)}">${qty}</td>
        <td>${valPrin ? statusBadge(valPrin) : '<span class="badge sem-data"><span class="dot"></span>—</span>'}</td>
        <td class="col-lote" style="color:var(--text-muted);font-size:12px">
          ${p.lotes.map(l => l.lote).filter(Boolean).join(', ') || '—'}
        </td>
        <td class="col-marca" style="color:var(--text-muted);font-size:12px">
          ${[...new Set(p.lotes.map(l => l.marca).filter(Boolean))].join(', ') || '—'}
        </td>
        <td>
          <div class="row-actions">
            <button class="btn-sm entry" onclick="openModal('entrada', ${p.id})">↑ Entrada</button>
            <button class="btn-sm exit"  onclick="openModal('saida',   ${p.id})">↓ Saída</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  updateStats();
}

// ════════════════════════════════════════════
// ORDENAR A TABELA AO CLICAR NO CABEÇALHO
// ════════════════════════════════════════════
function sortBy(campo) {
  // Se clicou no mesmo campo, inverte a direção
  if (sortField === campo) sortDir *= -1;
  else { sortField = campo; sortDir = 1; }

  // Atualiza os indicadores visuais de ordenação
  ['nome', 'tipo', 'qty', 'validade'].forEach(f => {
    const el = document.getElementById('sort-' + f);
    if (el) el.textContent = f === sortField ? (sortDir === 1 ? '↑' : '↓') : '';
  });

  renderTable();
}

// ════════════════════════════════════════════
// ATALHO DOS STAT CARDS DO CABEÇALHO
// Clica num card → vai para aba Estoque já filtrado
// ════════════════════════════════════════════
function irParaEstoque(filtroStatus) {
  // 1. Ativa a aba Estoque
  switchTab('estoque');

  // 2. Aplica o filtro de status correspondente
  const sel = document.getElementById('filter-status');
  if (sel) sel.value = filtroStatus;

  // 3. Limpa a busca de texto para não confundir
  const busca = document.getElementById('search');
  if (busca) busca.value = '';

  // 4. Re-renderiza a tabela com o filtro ativo
  renderTable();

  // 5. Rola até o topo do conteúdo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function switchTab(aba) {
  // Remove "active" de todas as abas e painéis
  document.querySelectorAll('.tab').forEach((t, i) => {
    const abas = ['estoque', 'movimentos', 'alertas'];
    t.classList.toggle('active', abas[i] === aba);
  });

  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + aba).classList.add('active');

  // Renderiza o conteúdo da aba clicada
  if (aba === 'movimentos') renderMovements();
  if (aba === 'alertas')    renderAlerts();
}

// ════════════════════════════════════════════
// ABRIR O MODAL
// Pode ser chamado com:
//   openModal('novo')           → cadastrar novo produto
//   openModal('entrada', 5)     → entrada no produto de ID 5
//   openModal('saida',   5)     → saída do produto de ID 5
// ════════════════════════════════════════════
function openModal(modo, produtoId = null, loteId = null) {
  modalMode = modo;

  // Garante que o botão de confirmar está visível por padrão
  // (o modal "ver-lotes" o esconde, por isso a gente restaura sempre que abre)
  document.getElementById('modal-submit-btn').style.display = '';

  document.getElementById('modal-overlay').classList.add('open');

  // ── MODAL: VER LOTES DO PRODUTO ──
  // Abre ao clicar no badge "▼ X lotes"
  if (modo === 'ver-lotes') {
    const prod = products.find(p => p.id === produtoId);
    if (!prod) return;

    document.getElementById('modal-title').textContent = `📦 Lotes — ${prod.nome}`;
    document.getElementById('modal-submit-btn').style.display = 'none'; // sem botão de confirmar

    // Monta uma tabela simples com todos os lotes, incluindo os zerados
    const linhasLotes = prod.lotes.map((l, idx) => `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 16px;border-bottom:1px solid var(--border);gap:12px">
        <div style="flex:1">
          <div style="font-weight:600;font-size:13px">
            Lote ${idx + 1}
            ${l.lote  ? ` <span style="color:var(--blue);font-size:12px">#${l.lote}</span>` : ''}
          </div>
          ${l.marca ? `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">${l.marca}</div>` : ''}
          ${l.obs   ? `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">${l.obs}</div>`   : ''}
        </div>
        <div style="text-align:center;min-width:60px">
          <div style="font-size:18px;font-weight:700;
            color:${l.qty === 0 ? 'var(--gray)' : 'var(--green)'}">
            ${l.qty}
          </div>
          <div style="font-size:10px;color:var(--text-muted)">unidades</div>
        </div>
        <div style="min-width:110px;text-align:center">
          ${statusBadge(l.validade)}
        </div>
        <button class="btn-editar-lote" onclick="openModal('editar-lote', ${prod.id}, ${l.id})"
          title="Editar este lote" style="font-size:14px;padding:4px 8px">✏️</button>
      </div>
    `).join('');

    document.getElementById('modal-form-content').innerHTML = `
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:8px">
        ${linhasLotes}
      </div>
      <div style="font-size:11px;color:var(--text-muted);text-align:right">
        Total: <strong style="color:var(--text)">${totalQty(prod)}</strong> unidades em ${prod.lotes.length} lote(s)
      </div>
    `;
    return;
  }

  // ── MODAL: EDITAR UM LOTE ESPECÍFICO ──
  // Abre ao clicar no ✏️ na linha do lote
  if (modo === 'editar-lote') {
    const prod = products.find(p => p.id === produtoId);
    const lote = prod?.lotes.find(l => l.id === loteId);
    if (!prod || !lote) return;

    // Guarda referências para usar no submitModal
    modalMode = 'editar-lote';
    document.getElementById('modal-title').textContent = `✏️ Editar Lote — ${prod.nome}`;
    document.getElementById('modal-submit-btn').textContent = 'Salvar';

    document.getElementById('modal-form-content').innerHTML = `
      <input type="hidden" id="f-prod-id"  value="${prod.id}">
      <input type="hidden" id="f-lote-id2" value="${lote.id}">

      <div class="form-row">
        <div>
          <label>Quantidade atual</label>
          <input type="number" id="f-qty" value="${lote.qty}" min="0">
        </div>
        <div>
          <label>Validade</label>
          <input type="date" id="f-val" value="${lote.validade}">
        </div>
      </div>

      <div class="form-row">
        <div>
          <label>Número do Lote</label>
          <input type="text" id="f-lote" value="${lote.lote}" placeholder="Ex: 01102">
        </div>
        <div>
          <label>Marca / Fabricante</label>
          <input type="text" id="f-marca" value="${lote.marca}" placeholder="Opcional">
        </div>
      </div>

      <div class="form-row full"><div>
        <label>Observação</label>
        <input type="text" id="f-obs" value="${lote.obs}" placeholder="Ex: gotas 10ml, troca...">
      </div></div>

      <hr class="form-divider">

      <!-- Botão perigoso de remover o lote -->
      <button type="button" style="background:var(--red-light);color:var(--red);border:1px solid #fecaca;
        border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer;font-family:'Inter',sans-serif"
        onclick="removerLote(${prod.id}, ${lote.id})">
        🗑 Remover este lote
      </button>
    `;
    return;
  }

  // ── MODAL: NOVO PRODUTO ──
  if (modo === 'novo') {
    document.getElementById('modal-title').textContent = '+ Novo Produto';
    document.getElementById('modal-submit-btn').textContent = 'Cadastrar';
    document.getElementById('modal-form-content').innerHTML = `
      <div class="form-row full"><div>
        <label>Nome do Produto</label>
        <input type="text" id="f-nome" placeholder="Ex: KETAMINA 10% - 50ML">
      </div></div>

      <div class="form-row">
        <div>
          <label>Tipo de embalagem</label>
          <select id="f-tipo" style="width:100%">
            <option value="ampola">Ampola</option>
            <option value="frasco">Frasco</option>
            <option value="frasco-ampola">Frasco-ampola</option>
            <option value="comprimido">Comprimido</option>
            <option value="caixa">Caixa</option>
            <option value="pacote">Pacote</option>
            <option value="unidade">Unidade</option>
            <option value="litro">Litro</option>
            <option value="galao">Galão</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label>Apresentação (qtd/volume)</label>
          <input type="text" id="f-qtdemb" placeholder="Ex: 50ml, 10 comp, 2ml">
        </div>
      </div>

      <div class="form-row">
        <div>
          <label>Quantidade inicial</label>
          <input type="number" id="f-qty" value="0" min="0">
        </div>
        <div>
          <label>Validade</label>
          <input type="date" id="f-val">
        </div>
      </div>

      <div class="form-row">
        <div>
          <label>Marca / Fabricante</label>
          <input type="text" id="f-marca" placeholder="Ex: Teuto, Hipolabor...">
        </div>
        <div>
          <label>Observação</label>
          <input type="text" id="f-obs" placeholder="Opcional">
        </div>
      </div>
    `;
    return;
  }

  // ── MODAL: ENTRADA ou SAÍDA ──

  // Monta a lista de produtos para o <select>
  const opcoesProdutos = products.map(p =>
    `<option value="${p.id}" ${p.id === produtoId ? 'selected' : ''}>
      ${p.nome} — ${p.tipo} (total: ${totalQty(p)})
    </option>`
  ).join('');

  const isEntrada = modo === 'entrada';
  document.getElementById('modal-title').textContent = isEntrada ? '↑ Registrar Entrada' : '↓ Registrar Saída';
  document.getElementById('modal-submit-btn').textContent = 'Registrar';

  // Monta o conteúdo do formulário
  document.getElementById('modal-form-content').innerHTML = `
    <div class="form-row full"><div>
      <label>Produto</label>
      <select id="f-product" style="width:100%" onchange="atualizarLotesModal('${modo}')">
        <option value="">— Selecione um produto —</option>
        ${opcoesProdutos}
      </select>
    </div></div>

    <!-- Área de lotes: vai aparecer depois que escolher o produto -->
    <div id="area-lotes"></div>

    <div class="form-row">
      <div>
        <label>Quantidade</label>
        <input type="number" id="f-qty" value="1" min="1">
      </div>
      ${isEntrada
        ? `<div><label>Validade do Lote</label><input type="date" id="f-val"></div>`
        : `<div><label>Motivo da saída</label><input type="text" id="f-motivo" placeholder="Ex: Uso em cirurgia, vencido..."></div>`
      }
    </div>

    ${isEntrada ? `
    <div class="form-row">
      <div>
        <label>Número do Lote</label>
        <input type="text" id="f-lote" placeholder="Ex: L2025B">
      </div>
      <div>
        <label>Marca / Fabricante</label>
        <input type="text" id="f-marca" placeholder="Opcional">
      </div>
    </div>
    <div class="form-row full"><div>
      <label>Observação</label>
      <input type="text" id="f-obs" placeholder="Opcional">
    </div></div>
    ` : `
    <div class="form-row full"><div>
      <label>Observação</label>
      <input type="text" id="f-obs" placeholder="Opcional">
    </div></div>
    `}
  `;

  // Se já veio com produto selecionado, atualiza os lotes
  if (produtoId) {
    atualizarLotesModal(modo);
  }
}

/**
 * Quando o usuário escolhe um produto no modal,
 * essa função mostra os lotes disponíveis daquele produto.
 * Para saída, o usuário pode escolher de qual lote vai sair.
 */
function atualizarLotesModal(modo) {
  const sel = document.getElementById('f-product');
  if (!sel) return;

  const prodId = parseInt(sel.value);
  const prod = products.find(p => p.id === prodId);
  const area = document.getElementById('area-lotes');

  if (!prod || !area) return;

  // Para SAÍDA: mostra um select para escolher o lote
  if (modo === 'saida') {
    const lotesComQty = prod.lotes.filter(l => l.qty > 0);

    if (lotesComQty.length === 0) {
      area.innerHTML = `<div style="color:var(--red);font-size:12px;padding:8px 0">⚠ Esse produto não tem estoque em nenhum lote.</div>`;
      return;
    }

    if (lotesComQty.length === 1) {
      // Só um lote, não precisa escolher
      area.innerHTML = `<input type="hidden" id="f-lote-id" value="${lotesComQty[0].id}">
        <div style="color:var(--text-muted);font-size:12px;margin-bottom:12px">
          📦 Lote único: val. ${fmtDate(lotesComQty[0].validade)} — estoque: ${lotesComQty[0].qty}
        </div>`;
      return;
    }

    // Vários lotes: deixa o usuário escolher de qual vai sair
    const opcoes = lotesComQty.map(l =>
      `<option value="${l.id}">
        Lote ${l.lote || 'sem número'} | Val: ${fmtDate(l.validade)} | Estoque: ${l.qty}
        ${l.marca ? '| ' + l.marca : ''}
      </option>`
    ).join('');

    area.innerHTML = `
      <div class="form-row full" style="margin-bottom:14px"><div>
        <label>De qual lote vai sair?</label>
        <select id="f-lote-id" style="width:100%">${opcoes}</select>
        <div class="form-hint">Escolha o lote com validade mais próxima primeiro (FEFO).</div>
      </div></div>
    `;

  } else {
    // Para ENTRADA: só mostra um aviso informativo
    area.innerHTML = `
      <div style="color:var(--text-muted);font-size:12px;margin-bottom:12px">
        📦 Produto já tem ${prod.lotes.length} lote(s). Esta entrada vai criar um novo lote.
      </div>
    `;
  }
}

// ════════════════════════════════════════════
// REMOVER UM LOTE DE UM PRODUTO
// Chamado pelo botão "🗑 Remover este lote" dentro do modal de edição
// ════════════════════════════════════════════
function removerLote(produtoId, loteId) {
  const prod = products.find(p => p.id === produtoId);
  if (!prod) return;

  // Não deixa remover se for o único lote do produto
  if (prod.lotes.length <= 1) {
    alert('Este produto tem apenas um lote. Para remover, exclua o produto inteiro.');
    return;
  }

  if (!confirm('Tem certeza que quer remover este lote?')) return;

  // Remove o lote da lista
  prod.lotes = prod.lotes.filter(l => l.id !== loteId);

  closeModal();
  renderTable();
}

// ════════════════════════════════════════════
// FECHAR O MODAL
// ════════════════════════════════════════════
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ════════════════════════════════════════════
// CONFIRMAR O FORMULÁRIO DO MODAL
// ════════════════════════════════════════════
function submitModal() {

  // ── SALVAR EDIÇÃO DE LOTE ──
  if (modalMode === 'editar-lote') {
    const prodId = parseInt(document.getElementById('f-prod-id').value);
    const loteId = parseInt(document.getElementById('f-lote-id2').value);
    const prod   = products.find(p => p.id === prodId);
    const lote   = prod?.lotes.find(l => l.id === loteId);
    if (!lote) return;

    lote.qty      = parseInt(document.getElementById('f-qty').value)  || 0;
    lote.validade = document.getElementById('f-val').value;
    lote.lote     = document.getElementById('f-lote').value.trim();
    lote.marca    = document.getElementById('f-marca').value.trim();
    lote.obs      = document.getElementById('f-obs').value.trim();

    closeModal();
    renderTable();
    return;
  }

  // ── CADASTRAR NOVO PRODUTO ──
  if (modalMode === 'novo') {
    const nome = document.getElementById('f-nome').value.trim();
    if (!nome) return alert('Por favor, informe o nome do produto.');

    const qty   = parseInt(document.getElementById('f-qty').value) || 0;
    const val   = document.getElementById('f-val').value;
    const lote  = document.getElementById('f-lote').value.trim();
    const marca = document.getElementById('f-marca').value.trim();
    const tipo  = document.getElementById('f-tipo').value;
    const obs   = document.getElementById('f-obs').value.trim();
    const qtdEmb = document.getElementById('f-qtdemb')?.value.trim() || '';

    const novoId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

    // Adiciona o novo produto com um lote inicial
    products.push({
      id: novoId,
      nome,
      tipo,
      qtdEmb,
      lotes: [{ id: novoId * 1000, qty, validade: val, lote, marca, obs }]
    });

    // Registra no histórico de movimentos
    if (qty > 0) {
      movements.unshift({
        tipo: 'entrada',
        produto: nome,
        qty,
        loteInfo: lote || 'novo',
        data: new Date().toISOString(),
        obs: 'Cadastro inicial'
      });
    }

  } else {
    // ── ENTRADA ou SAÍDA ──

    const prodId = parseInt(document.getElementById('f-product')?.value);
    if (!prodId) return alert('Por favor, selecione um produto.');

    const qty = parseInt(document.getElementById('f-qty').value) || 0;
    if (qty <= 0) return alert('A quantidade precisa ser maior que zero.');

    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    if (modalMode === 'saida') {
      // Para saída, precisa escolher de qual lote vai sair
      const loteIdEl = document.getElementById('f-lote-id');
      const loteId   = loteIdEl ? parseInt(loteIdEl.value) : null;

      // Acha o lote escolhido
      const loteAlvo = loteId
        ? prod.lotes.find(l => l.id === loteId)
        : prod.lotes.find(l => l.qty > 0); // pega o primeiro com estoque

      if (!loteAlvo) return alert('Nenhum lote disponível para saída.');
      if (loteAlvo.qty < qty) return alert(`Estoque insuficiente neste lote. Disponível: ${loteAlvo.qty}`);

      // Desconta do lote
      loteAlvo.qty -= qty;

      const motivo = document.getElementById('f-motivo')?.value || '';
      const obs    = document.getElementById('f-obs')?.value || '';

      movements.unshift({
        tipo: 'saida',
        produto: prod.nome,
        qty,
        loteInfo: loteAlvo.lote || `val. ${fmtDate(loteAlvo.validade)}`,
        data: new Date().toISOString(),
        obs: motivo || obs
      });

    } else {
      // Para entrada, cria um novo lote
      const val   = document.getElementById('f-val')?.value || '';
      const lote  = document.getElementById('f-lote')?.value.trim() || '';
      const marca = document.getElementById('f-marca')?.value.trim() || '';
      const obs   = document.getElementById('f-obs')?.value.trim() || '';

      const novoLoteId = prod.id * 1000 + prod.lotes.length + Date.now() % 1000;

      prod.lotes.push({ id: novoLoteId, qty, validade: val, lote, marca, obs });

      movements.unshift({
        tipo: 'entrada',
        produto: prod.nome,
        qty,
        loteInfo: lote || `val. ${fmtDate(val)}`,
        data: new Date().toISOString(),
        obs
      });
    }
  }

  closeModal();
  renderTable();
}

// ════════════════════════════════════════════
// RENDERIZAR O HISTÓRICO DE MOVIMENTOS
// ════════════════════════════════════════════
function renderMovements() {
  const lista  = document.getElementById('hist-list');
  const vazio  = document.getElementById('hist-empty');

  if (!movements.length) {
    vazio.style.display = 'block';
    lista.innerHTML = '';
    return;
  }

  vazio.style.display = 'none';

  lista.innerHTML = movements.map(m => `
    <div class="hist-item">
      <div>
        <span class="hist-type ${m.tipo}">${m.tipo === 'entrada' ? '↑ ENTRADA' : '↓ SAÍDA'}</span>
        <div class="hist-product">${m.produto}</div>
        ${m.loteInfo ? `<div class="hist-obs">Lote: ${m.loteInfo}</div>` : ''}
        ${m.obs ? `<div class="hist-obs">${m.obs}</div>` : ''}
      </div>
      <div>
        <div class="hist-qty ${m.tipo}">${m.tipo === 'entrada' ? '+' : '−'}${m.qty}</div>
        <div class="hist-date">${new Date(m.data).toLocaleString('pt-BR')}</div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════
// RENDERIZAR OS ALERTAS
// ════════════════════════════════════════════
function renderAlerts() {
  // Separa os produtos pelos tipos de alerta
  const vencidos = products.filter(p => piorStatus(p) === 'vencido');
  const alertas  = products.filter(p => piorStatus(p) === 'alerta');
  const zeros    = products.filter(p => totalQty(p) === 0);

  let html = '';

  // Mostra produtos com lotes vencidos
  if (vencidos.length) {
    html += `
      <div class="alert-section">
        <div class="alert-section-title red">✕ Vencidos — ${vencidos.length} produto(s)</div>
        ${vencidos.map(p => `
          <div class="hist-item">
            <div>
              <div class="hist-product">${p.nome}</div>
              <div class="hist-obs">${p.tipo} • total: ${totalQty(p)} unidades</div>
            </div>
            <div>${statusBadge(proximaValidade(p))}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Mostra produtos que vão vencer em breve
  if (alertas.length) {
    html += `
      <div class="alert-section">
        <div class="alert-section-title yellow">⚠ Vencendo em 90 dias — ${alertas.length} produto(s)</div>
        ${alertas.map(p => `
          <div class="hist-item">
            <div>
              <div class="hist-product">${p.nome}</div>
              <div class="hist-obs">${p.tipo} • total: ${totalQty(p)} unidades</div>
            </div>
            <div>${statusBadge(proximaValidade(p))}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Mostra produtos sem estoque
  if (zeros.length) {
    html += `
      <div class="alert-section">
        <div class="alert-section-title gray">📦 Estoque zerado — ${zeros.length} produto(s)</div>
        ${zeros.map(p => `
          <div class="hist-item">
            <div>
              <div class="hist-product">${p.nome}</div>
              <div class="hist-obs">${p.tipo}</div>
            </div>
            <span class="badge sem-data">zerado</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Se não há alertas, mostra mensagem positiva
  if (!html) {
    html = `
      <div class="all-ok">
        <div class="all-ok-icon">✅</div>
        <p>Tudo certo por aqui!</p>
        <small>Nenhum produto com alerta no momento</small>
      </div>
    `;
  }

  document.getElementById('alert-list').innerHTML = html;
}

// ════════════════════════════════════════════
// FECHAR MODAL AO CLICAR FORA DELE
// ════════════════════════════════════════════
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ════════════════════════════════════════════
// INICIALIZAÇÃO
// Roda quando a página abre pela primeira vez
// ════════════════════════════════════════════

// Verifica se o usuário já tinha escolhido um tema antes
// O localStorage guarda pequenas informações no navegador
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('tema-icone').textContent = '☀️';
}

/**
 * Troca entre tema claro e escuro.
 * Também salva a escolha do usuário para lembrar na próxima visita.
 */
function alternarTema() {
  const escuro = document.body.classList.toggle('dark');
  document.getElementById('tema-icone').textContent = escuro ? '☀️' : '🌙';
  localStorage.setItem('tema', escuro ? 'dark' : 'light');
}

renderTable();
