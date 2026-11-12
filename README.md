# Metoclopramide versus Ondansetron — Antiemetic Selection by Clinical Setting

An interactive, referenced walkthrough of the setting-based decision algorithm for choosing
between metoclopramide and ondansetron — initial assessment, six clinical-setting branches
(emetogenic chemotherapy/radionuclide therapy, the perioperative period, paediatric acute
gastroenteritis, pregnancy/hyperemesis gravidarum, the undifferentiated adult ED patient, and
opioid-induced/uraemic/vestibular/palliative nausea), each pairing a setting with a drug
recommendation and its GRADE certainty, converging on a drug-specific safety check (QT
prolongation risk vs extrapyramidal/sedation risk) and a closing reassessment step. Every box in
the diagram can be selected to reveal, in one place: what the step means, why the algorithm calls
for it, and the sources behind it.

**Live site:** https://satbuhan.github.io/metoclopramide-ondansetron-protocol/

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24170968.svg)](https://doi.org/10.5281/zenodo.24170968)

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Acute aortic dissection — initial medical management](https://github.com/satbuhan/aortic-dissection-protocol) ([live site](https://satbuhan.github.io/aortic-dissection-protocol/))
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))
- [Dexketoprofen vs ibuprofen — selecting an NSAID for acute pain](https://github.com/satbuhan/nsaid-pain-protocol) ([live site](https://satbuhan.github.io/nsaid-pain-protocol/))
- [Anticoagulant reversal in gastrointestinal haemorrhage](https://github.com/satbuhan/anticoagulant-reversal-protocol) ([live site](https://satbuhan.github.io/anticoagulant-reversal-protocol/))
- [The adult with obesity in emergency and critical care](https://github.com/satbuhan/obesity-critical-care-protocol) ([live site](https://satbuhan.github.io/obesity-critical-care-protocol/))
- [Dapagliflozin / SGLT2 inhibitor — overdose and acute illness management](https://github.com/satbuhan/dapagliflozin-overdose-protocol) ([live site](https://satbuhan.github.io/dapagliflozin-overdose-protocol/))
- [Lidocaine vs prilocaine — local anaesthesia for laceration repair](https://github.com/satbuhan/lidocaine-prilocaine-protocol) ([live site](https://satbuhan.github.io/lidocaine-prilocaine-protocol/))
- [Reperfusion therapy in acute pulmonary thromboembolism](https://github.com/satbuhan/pte-thrombolysis-protocol) ([live site](https://satbuhan.github.io/pte-thrombolysis-protocol/))
- [LMWH selection & renal dosing in NSTE-ACS](https://github.com/satbuhan/lmwh-nste-acs-protocol) ([live site](https://satbuhan.github.io/lmwh-nste-acs-protocol/))
- [Ketamine in head injury — safety & complication management](https://github.com/satbuhan/ketamine-head-injury-protocol) ([live site](https://satbuhan.github.io/ketamine-head-injury-protocol/))
- [Midazolam versus clonazepam — seizures, acute agitation & anxiety](https://github.com/satbuhan/midazolam-clonazepam-protocol) ([live site](https://satbuhan.github.io/midazolam-clonazepam-protocol/))
- [Vasopressor (aminergic) agent selection in shock states](https://github.com/satbuhan/vasopressor-shock-protocol) ([live site](https://satbuhan.github.io/vasopressor-shock-protocol/))
- [Whole-body CT in traumatic circulatory shock](https://github.com/satbuhan/wbct-trauma-protocol) ([live site](https://satbuhan.github.io/wbct-trauma-protocol/))
- [Epinephrine/Adrenaline revisited — contemporary decision-making algorithm](https://github.com/satbuhan/epinephrine-revisited-protocol) ([live site](https://satbuhan.github.io/epinephrine-revisited-protocol/))
- [Ketamine in emergency and critical care — indication-based decision algorithm](https://github.com/satbuhan/ketamine-indications-protocol) ([live site](https://satbuhan.github.io/ketamine-indications-protocol/))
- [Tenecteplase versus alteplase — fibrinolysis in STEMI](https://github.com/satbuhan/tenecteplase-alteplase-stemi-protocol) ([live site](https://satbuhan.github.io/tenecteplase-alteplase-stemi-protocol/))
- [Blood gas-guided assessment of the chemical warfare agent casualty](https://github.com/satbuhan/cwa-blood-gas-protocol) ([live site](https://satbuhan.github.io/cwa-blood-gas-protocol/))
- [Calcium channel blocker toxicity — phenotype-guided management](https://github.com/satbuhan/ccb-toxicity-protocol) ([live site](https://satbuhan.github.io/ccb-toxicity-protocol/))
- [Choosing an adjunct to haloperidol in hyperactive delirium with severe agitation](https://github.com/satbuhan/haloperidol-adjunct-protocol) ([live site](https://satbuhan.github.io/haloperidol-adjunct-protocol/))
- [Selection of a neuromuscular blocking agent for rapid sequence induction and intubation](https://github.com/satbuhan/succinylcholine-rocuronium-protocol) ([live site](https://satbuhan.github.io/succinylcholine-rocuronium-protocol/))
- [Pharmacological pain management in elderly patients](https://github.com/satbuhan/geriatric-pain-protocol) ([live site](https://satbuhan.github.io/geriatric-pain-protocol/))
- [Needle Aspiration versus Tube Thoracostomy — Symptom-Led Management of Spontaneous Pneumothorax](https://github.com/satbuhan/spontaneous-pneumothorax-protocol) ([live site](https://satbuhan.github.io/spontaneous-pneumothorax-protocol/))

## Why this exists

A flowchart alone tells a reader *what* to do at each step but not *why* — and metoclopramide and
ondansetron are among the most commonly prescribed antiemetics in general practice, often treated
as interchangeable even though the evidence says otherwise: which one performs better depends on
which emetic pathway is actually driving a given patient's nausea, which varies by clinical
setting. This page keeps the original algorithm exactly as authored, and attaches the clinical
reasoning, the effect sizes behind each setting's recommendation, and the literature to each box
without cluttering the diagram itself.

The algorithm this page presents is Figure 2 of "Metoclopramide versus Ondansetron in the
Management of Nausea and Vomiting: A Systematic Review of Comparative Studies" — an unpublished,
blinded manuscript submission (2026), a PRISMA 2020 systematic review (PubMed/MEDLINE, January
2000 to October 2026; 51 primary comparative studies in 52 reports, 17 evidence syntheses, 4
safety-only cohorts; 105 references) — from a standalone figure file supplied directly by the
authors, outside the blinded manuscript text (the manuscript's own narrative only embeds one
figure, the unrelated Figure 1 PRISMA study-selection flow diagram).

## Status

This is a working version, built to be tested on both desktop and mobile.

- **Source workflow note — a first for this atlas:** the manuscript's own narrative text, tables
  and 105-entry bibliography were condensed as usual by an external AI (Gemini) using this
  project's structured condensation prompt. But an internet outage meant the clinical-algorithm
  figure itself (Figure 2) could not be sent to Gemini for that pass — the condensation document
  explicitly records that attachment as having "arrived empty/unreadable". The figure was instead
  supplied directly to this build session as a TIFF image, and its box-by-box label/sub text and
  structure (the six-way setting fan-out, each branch pairing a setting with a recommendation,
  converging on a two-way drug-safety check and then reassessment) were read and transcribed
  directly from that image by this session — the first time in this atlas that a figure was
  transcribed without a prior AI condensation pass to check it against.
- **Reference verification — explicit, author-granted exception (the fifth in this atlas):** asked
  directly whether to extend the same no-independent-re-verification policy used for
  `epinephrine-revisited-protocol`, `ketamine-indications-protocol`, `haloperidol-adjunct-protocol`
  and `geriatric-pain-protocol` to this tool's 105-entry bibliography, the author confirmed the
  same policy for this fifth tool. The reference list was **not** independently re-verified
  against primary sources; every entry's `kind` field says so plainly: "As cited in the
  manuscript; not independently re-verified." See `assets/content.js`'s header comment and
  `METHODOLOGY.md` for the full precedent record.
- **Honest gaps, not invented citations:** two boxes — "Initial assessment" and "Reassess at 30 to
  60 minutes" — carry general clinical-practice content (red-flag exclusion and electrolyte
  correction; reassessment-and-escalation) that does not appear anywhere in the systematic
  review's own extracted text, since the review compares two drugs' efficacy and safety rather
  than describing a diagnostic work-up or reassessment protocol. Both are flagged in their own
  "Cautions & special populations" section with an empty reference list, rather than silently
  backed with a citation that was never actually there.
- **Rendering note — a regular two-column fan-out, simpler than the last tool's:** unlike
  `geriatric-pain-protocol`'s uneven three-way branch (which needed a separate `LAYOUT` group per
  row), this figure's six setting/recommendation pairs are a perfectly regular 2-column × 6-row
  grid with no missing cells, so all twelve boxes safely share one `LAYOUT` group. The long
  "fan-out from the setting decision" and "convergence into the safety check" edges — which skip
  past several rows they don't connect to — are routed through the narrow gutter between the two
  columns via `DETOUR`, confirmed clear of every node by this atlas's usual Playwright
  point-sampling overlap check (see `METHODOLOGY.md`).

## Disclaimer

This is an academic / educational reference tool, not a substitute for institutional protocol
or bedside clinical judgement. Doses shown reflect the algorithm as authored; verify against
current local protocol before clinical use. This tool's reference list is reproduced directly
from the source manuscript's own bibliography and was not independently re-verified for this
build — see Status above.

## How it's built

Plain HTML/CSS/JS, no build step and no framework — a single static site that GitHub Pages can
serve directly.

```
index.html          page structure — masthead, the diagram (initial assessment trunk, the
                     six-way setting fan-out, the drug-specific safety check, the closing
                     reassessment box), readout panel, references, abbreviation legend, footer
assets/style.css     design (the "paper" masthead/references, the diagram grid and its 2-wide
                     fan-outs)
assets/content.js    ← single source of truth for every node's text and reference list. Edit
                     this file to change what the page says.
assets/app.js        rendering + interaction (builds the diagram and its connector lines from
                     content.js, handles the click-to-expand panel on desktop and the bottom
                     sheet on mobile)
```

### Running it locally

No install needed:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Editing content

Open `assets/content.js`. Each entry in `NODES` is one box from the diagram (`meaning`,
`rationale`, optional `dose`/`cautions`, and `refs` pointing at numbered entries in
`REFERENCES`). Add or edit a reference in `REFERENCES` and point to it by `id` from any node.
Never change a node's `label` or `sub` text without the author team's sign-off — those fields
are the algorithm itself, transcribed verbatim from the authors' own figure.

### Building the next tool in this atlas

See [`METHODOLOGY.md`](METHODOLOGY.md) — the full build/verification process (fidelity rule,
content schema, citation verification, QA steps), written so that any collaborator or AI
assistant can pick this up and build the next tool the same way.
