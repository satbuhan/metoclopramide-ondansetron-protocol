// content.js — Metoclopramide versus ondansetron: a setting-based antiemetic
// selection algorithm (initial assessment -> six clinical-setting branches,
// each pairing a setting with a drug recommendation and GRADE certainty ->
// drug-specific safety check -> reassessment). Data only. Rendering logic
// lives in app.js.
// Co-authored by Dr. Özgür Karcıoğlu and Dr. Satuk Buğra Han Bozatlı.
//
// Source: Figure 2 of an unpublished, blinded manuscript submission,
// "Metoclopramide versus Ondansetron in the Management of Nausea and
// Vomiting: A Systematic Review of Comparative Studies" (2026) — a
// PRISMA 2020 systematic review (PubMed/MEDLINE, January 2000 to October
// 2026; 51 primary comparative studies in 52 reports, 17 evidence
// syntheses, 4 safety-only cohorts; 105 references). See METHODOLOGY.md
// for the fidelity rules this file follows: label/sub text is byte-for-byte
// as authored (figure boxes); meaning/rationale/cautions/refs are added
// research drawn from the manuscript's own text and tables.
//
// NOTE ON THE FIGURE ITSELF: the blinded .docx manuscript's own text
// neither embeds nor mentions a clinical decision-algorithm figure anywhere
// — its only named, embedded figure is Figure 1, the PRISMA 2020 study-
// selection flow diagram (Section 3.1), which is unrelated to the content
// of this tool. Figure 2 — the setting-based drug-selection algorithm this
// tool presents — is a standalone figure file supplied directly by the
// authors, outside the blinded manuscript text, the same arrangement used
// for several earlier tools in this atlas.
//
// WORKFLOW NOTE — how this build differs from the last several tools: the
// source document handed to this session for the manuscript's own narrative
// text, tables and bibliography was, as usual, a Gemini-condensed box-by-box
// extraction (same structured format, "UNCLEAR" discrepancy tags and all).
// But an internet outage meant Figure 2 itself could not be sent to Gemini
// for that same condensation pass — the extraction document explicitly
// records the figure attachment as having "arrived empty/unreadable". The
// figure was instead supplied directly to this session as a TIFF image.
// Its box-by-box label/sub text and its structure (a six-way clinical-
// setting fan-out, each branch pairing a setting box with a recommendation
// box, converging on a two-way drug-safety check and then a reassessment
// step) were read and transcribed directly from that image by this session
// — not inherited from a prior AI verification pass, unlike this figure's
// accompanying narrative content below.
//
// REFERENCES — verification policy for this tool (a deliberate,
// author-directed exception, not an oversight — the FIFTH tool in this
// atlas to carry this exception, after epinephrine-revisited-protocol,
// ketamine-indications-protocol, haloperidol-adjunct-protocol and
// geriatric-pain-protocol): asked explicitly whether to extend the same
// policy here, the author chose to treat this 105-entry bibliography the
// same way — transcribed directly from the manuscript's own reference list
// and NOT independently re-verified against primary sources for this
// build. Every entry's kind field states this plainly: "As cited in the
// manuscript; not independently re-verified." DOIs/PMIDs/URLs are
// transcribed as given in the manuscript (17 entries have no DOI and carry
// a PubMed URL instead, exactly as the manuscript states).
//
// Two boxes in this figure — "Initial assessment" and "Reassess at 30 to
// 60 minutes" — contain general clinical-practice content that does not
// appear anywhere in the systematic review's own extracted text (the
// review compares two drugs' efficacy and safety; it does not describe a
// diagnostic work-up or a reassessment protocol). This is disclosed in
// each node's own cautions field rather than silently backed with a
// citation that was never actually there.
const VERIFIED = "2026-11-12";

const REFERENCES = [
  { id: 1, kind: "As cited in the manuscript; not independently re-verified.", text: "Singh P, Yoon SS, Kuo B. Nausea: a review of pathophysiology and therapeutics. Ther Adv Gastroenterol. 2016;9(1):98-112.", url: "https://doi.org/10.1177/1756283X15618131" },
  { id: 2, kind: "As cited in the manuscript; not independently re-verified.", text: "Myer PA, Mannalithara A, Singh G, Singh G, Pasricha PJ, Ladabaum U. Clinical and economic burden of emergency department visits due to gastrointestinal diseases in the United States. Am J Gastroenterol. 2013;108(9):1496-1507.", url: "https://doi.org/10.1038/ajg.2013.199" },
  { id: 3, kind: "As cited in the manuscript; not independently re-verified.", text: "Sanger GJ, Andrews PLR. A history of drug discovery for treatment of nausea and vomiting and the implications for future research. Front Pharmacol. 2018;9:913.", url: "https://doi.org/10.3389/fphar.2018.00913" },
  { id: 4, kind: "As cited in the manuscript; not independently re-verified.", text: "Smith HS, Cox LR, Smith EJ. 5-HT3 receptor antagonists for the treatment of nausea/vomiting. Ann Palliat Med. 2012;1(2):115-120.", url: "https://doi.org/10.3978/j.issn.2224-5820.2012.07.07" },
  { id: 5, kind: "As cited in the manuscript; not independently re-verified.", text: "Lee A, Kuo B. Metoclopramide in the treatment of diabetic gastroparesis. Expert Rev Endocrinol Metab. 2010;5(5):653-662.", url: "https://doi.org/10.1586/eem.10.41" },
  { id: 6, kind: "As cited in the manuscript; not independently re-verified.", text: "Patanwala AE, Amini R, Hays DP, Rosen P. Antiemetic therapy for nausea and vomiting in the emergency department. J Emerg Med. 2009;39(3):330-336.", url: "https://doi.org/10.1016/j.jemermed.2009.08.060" },
  { id: 7, kind: "As cited in the manuscript; not independently re-verified.", text: "Gan TJ, Belani KG, Bergese S, Chung F, Diemunsch P, Habib AS, et al. Fourth consensus guidelines for the management of postoperative nausea and vomiting. Anesth Analg. 2020;131(2):411-448.", url: "https://doi.org/10.1213/ANE.0000000000004833" },
  { id: 8, kind: "As cited in the manuscript; not independently re-verified.", text: "Hesketh PJ, Kris MG, Basch E, Bohlke K, Barbour SY, Clark-Snow RA, et al. Antiemetics: ASCO guideline update. J Clin Oncol. 2020;38(24):2782-2797.", url: "https://doi.org/10.1200/JCO.20.01296" },
  { id: 9, kind: "As cited in the manuscript; not independently re-verified.", text: "Furyk JS, Meek RA, Egerton-Warburton D. Drugs for the treatment of nausea and vomiting in adults in the emergency department setting. Cochrane Database Syst Rev. 2015;2015(9):CD010106.", url: "https://doi.org/10.1002/14651858.CD010106.pub2" },
  { id: 10, kind: "As cited in the manuscript; not independently re-verified.", text: "deSouza IS, Allen R, Shrestha P, Thode H, Koos J, Singer A. Efficacy and safety of pharmacologic therapies for nausea and emesis in the emergency department: a systematic review and Bayesian network meta-analysis. Ann Emerg Med. 2025;86(6):646-658.", url: "https://doi.org/10.1016/j.annemergmed.2025.06.009" },
  { id: 11, kind: "As cited in the manuscript; not independently re-verified.", text: "Rao AS, Camilleri M. Review article: metoclopramide and tardive dyskinesia. Aliment Pharmacol Ther. 2010;31(1):11-19.", url: "https://doi.org/10.1111/j.1365-2036.2009.04189.x" },
  { id: 12, kind: "As cited in the manuscript; not independently re-verified.", text: "Freedman SB, Uleryk E, Rumantir M, Finkelstein Y. Ondansetron and the risk of cardiac arrhythmias: a systematic review and postmarketing analysis. Ann Emerg Med. 2013;64(1):19-25.e6.", url: "https://doi.org/10.1016/j.annemergmed.2013.10.026" },
  { id: 13, kind: "As cited in the manuscript; not independently re-verified.", text: "Page MJ, McKenzie JE, Bossuyt PM, Boutron I, Hoffmann TC, Mulrow CD, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ. 2021;372:n71.", url: "https://doi.org/10.1136/bmj.n71" },
  { id: 14, kind: "As cited in the manuscript; not independently re-verified.", text: "Tveden-Nyborg P, Bergmann TK, Jessen N, Simonsen U, Lykkesfeldt J. BCPT 2026 policy for experimental and clinical studies. Basic Clin Pharmacol Toxicol. 2025;137(6):e70159.", url: "https://doi.org/10.1111/bcpt.70159" },
  { id: 15, kind: "As cited in the manuscript; not independently re-verified.", text: "Sterne JAC, Savović J, Page MJ, Elbers RG, Blencowe NS, Boutron I, et al. RoB 2: a revised tool for assessing risk of bias in randomised trials. BMJ. 2019;366:l4898.", url: "https://doi.org/10.1136/bmj.l4898" },
  { id: 16, kind: "As cited in the manuscript; not independently re-verified.", text: "Sterne JA, Hernán MA, Reeves BC, Savović J, Berkman ND, Viswanathan M, et al. ROBINS-I: a tool for assessing risk of bias in non-randomised studies of interventions. BMJ. 2016;355:i4919.", url: "https://doi.org/10.1136/bmj.i4919" },
  { id: 17, kind: "As cited in the manuscript; not independently re-verified.", text: "Lakens D. Calculating and reporting effect sizes to facilitate cumulative science: a practical primer for t-tests and ANOVAs. Front Psychol. 2013;4:863.", url: "https://doi.org/10.3389/fpsyg.2013.00863" },
  { id: 18, kind: "As cited in the manuscript; not independently re-verified.", text: "Chinn S. A simple method for converting an odds ratio to effect size for use in meta-analysis. Stat Med. 2000;19(22):3127-3131.", url: "https://doi.org/10.1002/1097-0258(20001130)19:22<3127::aid-sim784>3.0.co;2-m" },
  { id: 19, kind: "As cited in the manuscript; not independently re-verified.", text: "Norman GR, Sloan JA, Wyrwich KW. Interpretation of changes in health-related quality of life: the remarkable universality of half a standard deviation. Med Care. 2003;41(5):582-592.", url: "https://doi.org/10.1097/01.MLR.0000062554.74615.4C" },
  { id: 20, kind: "As cited in the manuscript; not independently re-verified.", text: "Hendey GW, Donner NF, Fuller K. Clinically significant changes in nausea as measured on a visual analog scale. Ann Emerg Med. 2005;45(1):77-81.", url: "https://doi.org/10.1016/j.annemergmed.2004.07.446" },
  { id: 21, kind: "As cited in the manuscript; not independently re-verified.", text: "Meek R, Kelly AM, Hu XF. Use of the visual analog scale to rate and monitor severity of nausea in the emergency department. Acad Emerg Med. 2009;16(12):1304-1310.", url: "https://doi.org/10.1111/j.1553-2712.2009.00581.x" },
  { id: 22, kind: "As cited in the manuscript; not independently re-verified.", text: "Guyatt GH, Oxman AD, Vist GE, Kunz R, Falck-Ytter Y, Alonso-Coello P, et al. GRADE: an emerging consensus on rating quality of evidence and strength of recommendations. BMJ. 2008;336(7650):924-926.", url: "https://doi.org/10.1136/bmj.39489.470347.AD" },
  { id: 23, kind: "As cited in the manuscript; not independently re-verified.", text: "Roila F, Del Favero A. Ondansetron clinical pharmacokinetics. Clin Pharmacokinet. 1995;29(2):95-109.", url: "https://doi.org/10.2165/00003088-199529020-00004" },
  { id: 24, kind: "As cited in the manuscript; not independently re-verified.", text: "Parlak I, Atilla R, Cicek M, Parlak M, Erdur B, Guryay M, et al. Rate of metoclopramide infusion affects the severity and incidence of akathisia. Emerg Med J. 2005;22(9):621-624.", url: "https://doi.org/10.1136/emj.2004.014712" },
  { id: 25, kind: "As cited in the manuscript; not independently re-verified.", text: "Hafermann MJ, Namdar R, Seibold GE, Page RL. Effect of intravenous ondansetron on QT interval prolongation in patients with cardiovascular disease and additional risk factors for torsades: a prospective, observational study. Drug Healthc Patient Saf. 2011;3:53-58.", url: "https://doi.org/10.2147/DHPS.S25623" },
  { id: 26, kind: "As cited in the manuscript; not independently re-verified.", text: "Egerton-Warburton D, Meek R, Mee MJ, Braitberg G. Antiemetic use for nausea and vomiting in adult emergency department patients: randomized controlled trial comparing ondansetron, metoclopramide, and placebo. Ann Emerg Med. 2014;64(5):526-532.e1.", url: "https://doi.org/10.1016/j.annemergmed.2014.03.017" },
  { id: 27, kind: "As cited in the manuscript; not independently re-verified.", text: "Barrett TW, DiPersio DM, Jenkins CA, Jack M, McCoin NS, Storrow AB, et al. A randomized, placebo-controlled trial of ondansetron, metoclopramide, and promethazine in adults. Am J Emerg Med. 2010;29(3):247-255.", url: "https://doi.org/10.1016/j.ajem.2009.09.028" },
  { id: 28, kind: "As cited in the manuscript; not independently re-verified.", text: "Zamani M, Namdar B, Azizkhani R, Ahmadi O, Esmailian M. Comparing the antiemetic effects of ondansetron and metoclopramide in patients with minor head trauma. Emerg (Tehran). 2015;3(4):137-140.", url: "https://pubmed.ncbi.nlm.nih.gov/26495402/" },
  { id: 29, kind: "As cited in the manuscript; not independently re-verified.", text: "Feiz Disfani H, Kamandi M, Hoseini SB, Shirazi N, Panahi M. Nausea control in mild head trauma patients: effectiveness of metoclopramide and ondansetron in the emergency department in a double-blind study. Caspian J Intern Med. 2022;13(4):699-704.", url: "https://doi.org/10.22088/cjim.13.4.699" },
  { id: 30, kind: "As cited in the manuscript; not independently re-verified.", text: "Jokar A, Khademhosseini P, Ahmadi K, Sistani A, Amiri M, Sinaki AG. A comparison of metoclopramide and ondansetron efficacy for the prevention of nausea and vomiting in patients suffered from renal colic. Open Access Maced J Med Sci. 2018;6(10):1833-1838.", url: "https://doi.org/10.3889/oamjms.2018.302" },
  { id: 31, kind: "As cited in the manuscript; not independently re-verified.", text: "Garra G, Singer AJ, Bamber D, Chohan J, Troxell R, Thode HC. Pretreatment of patients requiring oral contrast abdominal computed tomography with antiemetics: a randomized controlled trial of efficacy. Ann Emerg Med. 2008;53(4):528-533.", url: "https://doi.org/10.1016/j.annemergmed.2008.06.003" },
  { id: 32, kind: "As cited in the manuscript; not independently re-verified.", text: "Afacan MA, Tayfur İ. Comparison of the effects of metoclopramide and ondansetron on emergency service observation times in acute gastroenteritis-related nausea and vomiting cases. Sisli Etfal Hastan Tip Bul. 2019;53(2):186-189.", url: "https://doi.org/10.14744/SEMB.2019.80217" },
  { id: 33, kind: "As cited in the manuscript; not independently re-verified.", text: "Meek R, Mee MJ, Egerton-Warburton D, Graudins A, Meyer A, Pouryahya P, et al. Randomized placebo-controlled trial of droperidol and ondansetron for adult emergency department patients with nausea. Acad Emerg Med. 2018;26(8):867-877.", url: "https://doi.org/10.1111/acem.13650" },
  { id: 34, kind: "As cited in the manuscript; not independently re-verified.", text: "Al-Ansari K, Alomary S, Abdulateef H, Alshawagfa M, Kamal K. Metoclopramide versus ondansetron for the treatment of vomiting in children with acute gastroenteritis. J Pediatr Gastroenterol Nutr. 2011;53(2):156-160.", url: "https://doi.org/10.1097/MPG.0b013e3182132d8d" },
  { id: 35, kind: "As cited in the manuscript; not independently re-verified.", text: "Epifanio M, Portela JL, Piva JP, Ferreira CHT, Sarria EE, Mattiello R. Bromopride, metoclopramide, or ondansetron for the treatment of vomiting in the pediatric emergency department: a randomized controlled trial. J Pediatr (Rio J). 2017;94(1):62-68.", url: "https://doi.org/10.1016/j.jped.2017.06.004" },
  { id: 36, kind: "As cited in the manuscript; not independently re-verified.", text: "Ahmad M, Rawat A, Farrukh S, Haq I, Kumar Mandal A, Syed A, et al. Comparative analysis of oral ondansetron, metoclopramide, and domperidone for managing vomiting in children with acute gastroenteritis. Cureus. 2023;15(10):e47611.", url: "https://doi.org/10.7759/cureus.47611" },
  { id: 37, kind: "As cited in the manuscript; not independently re-verified.", text: "Hardy J, Daly S, McQuade B, Albertsson M, Chimontsi-Kypriou V, Stathopoulos P, et al. A double-blind, randomised, parallel group, multinational, multicentre study comparing a single dose of ondansetron 24 mg p.o. with placebo and metoclopramide 10 mg t.d.s. p.o. in the treatment of opioid-induced nausea and emesis in cancer patients. Support Care Cancer. 2002;10(3):231-236.", url: "https://doi.org/10.1007/s00520-001-0332-1" },
  { id: 38, kind: "As cited in the manuscript; not independently re-verified.", text: "Ljutić D, Perković D, Rumboldt Z, Bagatin J, Hozo I, Pivac N. Comparison of ondansetron with metoclopramide in the symptomatic relief of uremia-induced nausea and vomiting. Kidney Blood Press Res. 2002;25(1):61-64.", url: "https://doi.org/10.1159/000049437" },
  { id: 39, kind: "As cited in the manuscript; not independently re-verified.", text: "Venail F, Biboulet R, Mondain M, Uziel A. A protective effect of 5-HT3 antagonist against vestibular deficit? Metoclopramide versus ondansetron at the early stage of vestibular neuritis: a pilot study. Eur Ann Otorhinolaryngol Head Neck Dis. 2012;129(2):65-68.", url: "https://doi.org/10.1016/j.anorl.2011.10.006" },
  { id: 40, kind: "As cited in the manuscript; not independently re-verified.", text: "Konysheva A, Myasoyedov S. Chlorpromazine versus metoclopramide for neurogenic nausea and vomiting in incurable patients with gastrointestinal tumors: a prospective observational cohort study. Cancer Manag Res. 2026;18:612989.", url: "https://doi.org/10.2147/CMAR.S612989" },
  { id: 41, kind: "As cited in the manuscript; not independently re-verified.", text: "Abas MN, Tan PC, Azmi N, Omar SZ. Ondansetron compared with metoclopramide for hyperemesis gravidarum: a randomized controlled trial. Obstet Gynecol. 2014;123(6):1272-1279.", url: "https://doi.org/10.1097/AOG.0000000000000242" },
  { id: 42, kind: "As cited in the manuscript; not independently re-verified.", text: "Kashifard M, Basirat Z, Kashifard M, Golsorkhtabar-Amiri M, Moghaddamnia A. Ondansetrone or metoclopromide? Which is more effective in severe nausea and vomiting of pregnancy? A randomized trial double-blind study. Clin Exp Obstet Gynecol. 2013;40(1):127-130.", url: "https://pubmed.ncbi.nlm.nih.gov/23724526/" },
  { id: 43, kind: "As cited in the manuscript; not independently re-verified.", text: "Robson S, McParlin C, Mossop H, Lie M, Fernandez-Garcia C, Howel D, et al. Ondansetron and metoclopramide as second-line antiemetics in women with nausea and vomiting in pregnancy: the EMPOWER pilot factorial RCT. Health Technol Assess. 2021;25(63):1-116.", url: "https://doi.org/10.3310/hta25630" },
  { id: 44, kind: "As cited in the manuscript; not independently re-verified.", text: "Klauser CK, Fox NS, Istwan N, Rhea D, Rebarber A, Desch C, et al. Treatment of severe nausea and vomiting of pregnancy with subcutaneous medications. Am J Perinatol. 2011;28(9):715-721.", url: "https://doi.org/10.1055/s-0031-1280594" },
  { id: 45, kind: "As cited in the manuscript; not independently re-verified.", text: "Freedman SB, Adler M, Seshadri R, Powell EC. Oral ondansetron for gastroenteritis in a pediatric emergency department. N Engl J Med. 2006;354(16):1698-1705.", url: "https://doi.org/10.1056/NEJMoa055119" },
  { id: 46, kind: "As cited in the manuscript; not independently re-verified.", text: "Fedorowicz Z, Jagannath VA, Carter B. Antiemetics for reducing vomiting related to acute gastroenteritis in children and adolescents. Cochrane Database Syst Rev. 2011;2011(9):CD005506.", url: "https://doi.org/10.1002/14651858.CD005506.pub5" },
  { id: 47, kind: "As cited in the manuscript; not independently re-verified.", text: "Carter B, Fedorowicz Z. Antiemetic treatment for acute gastroenteritis in children: an updated Cochrane systematic review with meta-analysis and mixed treatment comparison in a Bayesian framework. BMJ Open. 2012;2(4).", url: "https://doi.org/10.1136/bmjopen-2011-000622" },
  { id: 48, kind: "As cited in the manuscript; not independently re-verified.", text: "Niño-Serna LF, Acosta-Reyes J, Veroniki AA, Florez ID. Antiemetics in children with acute gastroenteritis: a meta-analysis. Pediatrics. 2020;145(4).", url: "https://doi.org/10.1542/peds.2019-3260" },
  { id: 49, kind: "As cited in the manuscript; not independently re-verified.", text: "Barot KS, Vaghasiya KN, Suhagiya GH, Singh AP, Nadeem S, Qureshi AN, et al. Comparing the efficacy of ondansetron, domperidone, and metoclopramide in treating vomiting in pediatric patients with acute gastroenteritis: a network meta-analysis. Cureus. 2024;16(8):e67902.", url: "https://doi.org/10.7759/cureus.67902" },
  { id: 50, kind: "As cited in the manuscript; not independently re-verified.", text: "Alsabri M, Abouelmagd K, Bostamy Elsnhory A, Kamal I, Makram Elsayed S, Shehada W, et al. Comparative efficacy and safety of antiemetics for pediatric gastroenteritis-related vomiting in emergency departments: a network meta-analysis. Curr Med Res Opin. 2026. Published online ahead of print.", url: "https://doi.org/10.1080/03007995.2026.2734671" },
  { id: 51, kind: "As cited in the manuscript; not independently re-verified.", text: "Albazee E, Almahmoud L, Al-Rshoud F, Sallam D, Albzea W, Alenezi R, et al. Ondansetron versus metoclopramide for managing hyperemesis gravidarum: a systematic review and meta-analysis of randomized controlled trials. Turk J Obstet Gynecol. 2022;19(2):162-169.", url: "https://doi.org/10.4274/tjod.galenos.2022.14367" },
  { id: 52, kind: "As cited in the manuscript; not independently re-verified.", text: "Boelig RC, Barton SJ, Saccone G, Kelly AJ, Edwards SJ, Berghella V. Interventions for treating hyperemesis gravidarum. Cochrane Database Syst Rev. 2016;2016(5):CD010607.", url: "https://doi.org/10.1002/14651858.CD010607.pub2" },
  { id: 53, kind: "As cited in the manuscript; not independently re-verified.", text: "Sridharan K, Sivaramakrishnan G. Interventions for treating hyperemesis gravidarum: a network meta-analysis of randomized clinical trials. J Matern Fetal Neonatal Med. 2018;33(8):1405-1411.", url: "https://doi.org/10.1080/14767058.2018.1519540" },
  { id: 54, kind: "As cited in the manuscript; not independently re-verified.", text: "McParlin C, O'Donnell A, Robson SC, Beyer F, Moloney E, Bryant A, et al. Treatments for hyperemesis gravidarum and nausea and vomiting in pregnancy: a systematic review. JAMA. 2016;316(13):1392-1401.", url: "https://doi.org/10.1001/jama.2016.14337" },
  { id: 55, kind: "As cited in the manuscript; not independently re-verified.", text: "Bosnjak SM, Nesković-Konstantinović ZB, Radulović SS, Susnjar S, Mitrovi LB. High efficacy of a single oral dose of ondansetron 8 mg versus a metoclopramide regimen in the prevention of acute emesis induced by fluorouracil, doxorubicin and cyclophosphamide (FAC) chemotherapy for breast cancer. J Chemother. 2000;12(5):446-453.", url: "https://doi.org/10.1179/joc.2000.12.5.446" },
  { id: 56, kind: "As cited in the manuscript; not independently re-verified.", text: "Bhatia A, Tripathi KD, Sharma M. Comparison of ondansetron with metoclopramide in prevention of acute emesis associated with low dose & high dose cisplatin chemotherapy. Indian J Med Res. 2003;118:33-41.", url: "https://pubmed.ncbi.nlm.nih.gov/14748464/" },
  { id: 57, kind: "As cited in the manuscript; not independently re-verified.", text: "Bhatia A, Tripathi KD, Sharma M. Efficacy & tolerability of ondansetron compared to metoclopramide in dose dependent cisplatin-induced delayed emesis. Indian J Med Res. 2004;120(3):183-193.", url: "https://pubmed.ncbi.nlm.nih.gov/15489556/" },
  { id: 58, kind: "As cited in the manuscript; not independently re-verified.", text: "Manusirivithaya S, Chareoniam V, Isariyodom P, Sungsab D. Comparison of ondansetron-dexamethasone-lorazepam versus metoclopramide-dexamethasone-lorazepam in the control of cisplatin induced emesis. J Med Assoc Thai. 2001;84(7):966-972.", url: "https://pubmed.ncbi.nlm.nih.gov/11759977/" },
  { id: 59, kind: "As cited in the manuscript; not independently re-verified.", text: "Raynov J, Danon S, Valerianova Z. Control of acute emesis in repeated courses of moderately emetogenic chemotherapy. J BUON. 2002;7(1):57-60.", url: "https://pubmed.ncbi.nlm.nih.gov/17577262/" },
  { id: 60, kind: "As cited in the manuscript; not independently re-verified.", text: "Mirzababaee M, Shafiei B, Seifollahi S, Motazdian M, Fatholahi L, Delavari S, et al. Management of gastrointestinal complaints in differentiated thyroid cancer patients treated with (131)I: comparison of the efficacy of pantoprazole, metoclopramide, and ondansetron - a randomized clinical trial. Nuklearmedizin. 2014;53(5):186-189.", url: "https://doi.org/10.3413/Nukmed-0654-14-03" },
  { id: 61, kind: "As cited in the manuscript; not independently re-verified.", text: "Li X, Cao J, Wang W, Zhu X, Sun Y, Song L, et al. The prophylactic antiemetic therapies in management of differentiated thyroid cancer patients with radioactive iodine therapy: a single-center, non-randomized clinical trial. Front Endocrinol (Lausanne). 2024;15:1310223.", url: "https://doi.org/10.3389/fendo.2024.1310223" },
  { id: 62, kind: "As cited in the manuscript; not independently re-verified.", text: "Pan PH, Moore CH. Comparing the efficacy of prophylactic metoclopramide, ondansetron, and placebo in cesarean section patients given epidural anesthesia. J Clin Anesth. 2001;13(6):430-435.", url: "https://doi.org/10.1016/s0952-8180(01)00294-x" },
  { id: 63, kind: "As cited in the manuscript; not independently re-verified.", text: "Bolton CM, Myles PS, Carlin JB, Nolan T. Randomized, double-blind study comparing the efficacy of moderate-dose metoclopramide and ondansetron for the prophylactic control of postoperative vomiting in children after tonsillectomy. Br J Anaesth. 2007;99(5):699-703.", url: "https://doi.org/10.1093/bja/aem236" },
  { id: 64, kind: "As cited in the manuscript; not independently re-verified.", text: "Gunter JB, McAuliffe JJ, Beckman EC, Wittkugel EP, Spaeth JP, Varughese AM. A factorial study of ondansetron, metoclopramide, and dexamethasone for emesis prophylaxis after adenotonsillectomy in children. Paediatr Anaesth. 2006;16(11):1153-1165.", url: "https://doi.org/10.1111/j.1460-9592.2006.01952.x" },
  { id: 65, kind: "As cited in the manuscript; not independently re-verified.", text: "Mishra AR, Srivastava U, Kumar D, Saraswat N, Kumar A, Payal YS, et al. Nausea and vomiting after ENT surgeries: a comparison between ondansetron, metoclopramide and small dose of propofol. Indian J Otolaryngol Head Neck Surg. 2010;62(1):29-31.", url: "https://doi.org/10.1007/s12070-010-0012-x" },
  { id: 66, kind: "As cited in the manuscript; not independently re-verified.", text: "Karlidağ T, Kaygusuz I, Bestaş A, Keleş E, Demirbağ E, Yalçin S. [The efficacy of droperidol, metoclopramide, propofol, and ondansetron for the prevention of nausea and vomiting following middle ear surgery]. Kulak Burun Bogaz Ihtis Derg. 2002;9(5):331-336.", url: "https://pubmed.ncbi.nlm.nih.gov/12471278/" },
  { id: 67, kind: "As cited in the manuscript; not independently re-verified.", text: "Ebrahim Soltani A, Mohammadinasab H, Goudarzi M, Arbabi S, Mohtaram R, Afkham K, et al. Acupressure using ondansetron versus metoclopramide on reduction of postoperative nausea and vomiting after strabismus surgery. Arch Iran Med. 2010;13(4):288-293.", url: "https://pubmed.ncbi.nlm.nih.gov/20597561/" },
  { id: 68, kind: "As cited in the manuscript; not independently re-verified.", text: "Talesh KT, Motamedi MH, Kahnamouii S. Comparison of ondansetron and metoclopramide antiemetic prophylaxis in maxillofacial surgery patients. Oral Surg Oral Med Oral Pathol Oral Radiol Endod. 2010;111(3):275-277.", url: "https://doi.org/10.1016/j.tripleo.2010.04.034" },
  { id: 69, kind: "As cited in the manuscript; not independently re-verified.", text: "Ekinci O, Malat I, Işıtmangil G, Aydın N. A randomized comparison of droperidol, metoclopramide, tropisetron, and ondansetron for the prevention of postoperative nausea and vomiting. Gynecol Obstet Invest. 2010;71(1):59-65.", url: "https://doi.org/10.1159/000320747" },
  { id: 70, kind: "As cited in the manuscript; not independently re-verified.", text: "Bilgin TE, Birbicer H, Ozer Z, Doruk N, Tok E, Oral U. A comparative study of the antiemetic efficacy of dexamethasone, ondansetron, and metoclopramide in patients undergoing gynecological surgery. Med Sci Monit. 2010;16(7):CR336-CR341.", url: "https://pubmed.ncbi.nlm.nih.gov/20581776/" },
  { id: 71, kind: "As cited in the manuscript; not independently re-verified.", text: "Krobbuaban B, Pitakpol S, Diregpoke S. Ondansetron vs. metoclopramide for the prevention of nausea and vomiting after gynecologic surgery. J Med Assoc Thai. 2008;91(5):669-674.", url: "https://pubmed.ncbi.nlm.nih.gov/18672630/" },
  { id: 72, kind: "As cited in the manuscript; not independently re-verified.", text: "Sharma S, Abdullah N. A comparison of commonly used anti-emetics for the prevention of emetic sequelae after a major gynaecological surgery. Singapore Med J. 2000;41(4):147-150.", url: "https://pubmed.ncbi.nlm.nih.gov/11063177/" },
  { id: 73, kind: "As cited in the manuscript; not independently re-verified.", text: "Abreu MP, Vieira JL, Silva IF, Miziara LE, Fófano R. [Efficacy of ondansetron, metoclopramide, droperidol and dexametasone in preventing post-gynecological videolaparoscopy nausea and vomiting in outpatient setting. Comparative study]. Rev Bras Anestesiol. 2006;56(1):8-15.", url: "https://doi.org/10.1590/s0034-70942006000100002" },
  { id: 74, kind: "As cited in the manuscript; not independently re-verified.", text: "Maddali MM, Mathew J, Fahr J, Zarroug AW. Postoperative nausea and vomiting in diagnostic gynaecological laparoscopic procedures: comparison of the efficacy of the combination of dexamethasone and metoclopramide with that of dexamethasone and ondansetron. J Postgrad Med. 2003;49(4):302-306.", url: "https://pubmed.ncbi.nlm.nih.gov/14699226/" },
  { id: 75, kind: "As cited in the manuscript; not independently re-verified.", text: "Barzanji A, Nasseri K, Sadeghi S, Ardalan M, Nouri B, Daseh K. Comparing the effect of ondansetron-dexamethasone and metoclopramide-dexamethasone on postoperative nausea and vomiting after gynecological laparoscopy: a randomized double-blind clinical trial. Adv Biomed Res. 2022;11:44.", url: "https://doi.org/10.4103/abr.abr_251_20" },
  { id: 76, kind: "As cited in the manuscript; not independently re-verified.", text: "Jee YS, Yoon HJ, Jang CH. Prophylactic antiemetic effects in gynecologic patients receiving fentanyl IV-patient controlled analgesia: comparison of combined treatment with ondansetron and dexamethasone with metoclopramide and dexamethasone. Korean J Anesthesiol. 2010;59(5):335-339.", url: "https://doi.org/10.4097/kjae.2010.59.5.335" },
  { id: 77, kind: "As cited in the manuscript; not independently re-verified.", text: "Wilson EB, Bass CS, Abrameit W, Roberson R, Smith RW. Metoclopramide versus ondansetron in prophylaxis of nausea and vomiting for laparoscopic cholecystectomy. Am J Surg. 2001;181(2):138-141.", url: "https://doi.org/10.1016/s0002-9610(00)00574-2" },
  { id: 78, kind: "As cited in the manuscript; not independently re-verified.", text: "Quaynor H, Raeder JC. Incidence and severity of postoperative nausea and vomiting are similar after metoclopramide 20 mg and ondansetron 8 mg given by the end of laparoscopic cholecystectomies. Acta Anaesthesiol Scand. 2002;46(1):109-113.", url: "https://pubmed.ncbi.nlm.nih.gov/11903083/" },
  { id: 79, kind: "As cited in the manuscript; not independently re-verified.", text: "Sandhu T, Tanvatcharaphan P, Cheunjongkolkul V. Ondansetron versus metoclopramide in prophylaxis of nausea and vomiting for laparoscopic cholecystectomy: a prospective double-blind randomized study. Asian J Surg. 2008;31(2):50-54.", url: "https://doi.org/10.1016/S1015-9584(08)60057-3" },
  { id: 80, kind: "As cited in the manuscript; not independently re-verified.", text: "Oksuz H, Zencirci B, Ezberci M. Comparison of the effectiveness of metoclopramide, ondansetron, and granisetron on the prevention of nausea and vomiting after laparoscopic cholecystectomy. J Laparoendosc Adv Surg Tech A. 2007;17(6):803-808.", url: "https://doi.org/10.1089/lap.2006.0243" },
  { id: 81, kind: "As cited in the manuscript; not independently re-verified.", text: "Kaki AM, Abd El-Hakeem EE. Prophylaxis of postoperative nausea and vomiting with ondansetron, metoclopramide, or placebo in total intravenous anesthesia patients undergoing laparoscopic cholecystectomy. Saudi Med J. 2008;29(10):1408-1413.", url: "https://pubmed.ncbi.nlm.nih.gov/18946563/" },
  { id: 82, kind: "As cited in the manuscript; not independently re-verified.", text: "Isazadehfar K, Entezariasl M, Shahbazzadegan B, Nourani Z, Shafaee Y. The comparative study of ondansetron and metoclopramide effects in reducing nausea and vomiting after laparoscopic cholecystectomy. Acta Med Iran. 2017;55(4):254-258.", url: "https://pubmed.ncbi.nlm.nih.gov/28532137/" },
  { id: 83, kind: "As cited in the manuscript; not independently re-verified.", text: "Leksowski K, Peryga P, Szyca R. Ondansetron, metoclopramid, dexamethason, and their combinations compared for the prevention of postoperative nausea and vomiting in patients undergoing laparoscopic cholecystectomy: a prospective randomized study. Surg Endosc. 2006;20(6):878-882.", url: "https://doi.org/10.1007/s00464-005-0622-7" },
  { id: 84, kind: "As cited in the manuscript; not independently re-verified.", text: "Ebrahimian M, Mirhashemi SH, Oshidari B, Zamani A, Shadidi-Asil R, Kialashaki M, et al. Effects of ondansetron, metoclopramide and granisetron on perioperative nausea and vomiting in patients undergone bariatric surgery: a randomized clinical trial. Surg Endosc. 2023;37(6):4495-4504.", url: "https://doi.org/10.1007/s00464-023-09939-2" },
  { id: 85, kind: "As cited in the manuscript; not independently re-verified.", text: "Jokela R, Koivuranta M, Kangas-Saarela T, Purhonen S, Alahuhta S. Oral ondansetron, tropisetron or metoclopramide to prevent postoperative nausea and vomiting: a comparison in high-risk patients undergoing thyroid or parathyroid surgery. Acta Anaesthesiol Scand. 2002;46(5):519-524.", url: "https://doi.org/10.1034/j.1399-6576.2002.460508.x" },
  { id: 86, kind: "As cited in the manuscript; not independently re-verified.", text: "Dabbous A, Khoury SJ, Chehab IR, Bartelmaos T, Khoury G. Ondansetron versus dehydrobenzoperidol and metoclopramide for management of postoperative nausea in laparoscopic surgery patients. JSLS. 2001;5(2):139-142.", url: "https://pubmed.ncbi.nlm.nih.gov/11394426/" },
  { id: 87, kind: "As cited in the manuscript; not independently re-verified.", text: "Rauers NI, Stüber F, Lee EH, Musshoff F, Fimmers R, Barann M, et al. Antagonistic effects of ondansetron and tramadol? A randomized placebo and active drug controlled study. J Pain. 2010;11(12):1274-1281.", url: "https://doi.org/10.1016/j.jpain.2010.03.003" },
  { id: 88, kind: "As cited in the manuscript; not independently re-verified.", text: "Omar SH, Kamel NM, Radwan KG, Ebied RS, Ali MZ, Osman ES, et al. Sub-antibiotic doses of erythromycin as a prokinetic in abdominal surgeries: reviving the old. J Egypt Soc Parasitol. 2010;40(3):809-820.", url: "https://pubmed.ncbi.nlm.nih.gov/21268547/" },
  { id: 89, kind: "As cited in the manuscript; not independently re-verified.", text: "Wu SJ, Xiong XZ, Cheng TY, Lin YX, Cheng NS. Efficacy of ondansetron vs. metoclopramide in prophylaxis of postoperative nausea and vomiting after laparoscopic cholecystectomy: a systematic review and meta-analysis. Hepatogastroenterology. 2012;59(119):2064-2074.", url: "https://doi.org/10.5754/hge11811" },
  { id: 90, kind: "As cited in the manuscript; not independently re-verified.", text: "Sumie M, Cheng S, Niimi N, Englesakis M, Yang A, Adam RI, et al. Effect of ondansetron and metoclopramide on postoperative nausea and vomiting in children undergoing tonsillectomy with or without adenoidectomy: a systematic review with meta-analysis. J Anesth. 2025;39(3):345-354.", url: "https://doi.org/10.1007/s00540-025-03463-4" },
  { id: 91, kind: "As cited in the manuscript; not independently re-verified.", text: "Bolton CM, Myles PS, Nolan T, Sterne JA. Prophylaxis of postoperative vomiting in children undergoing tonsillectomy: a systematic review and meta-analysis. Br J Anaesth. 2006;97(5):593-604.", url: "https://doi.org/10.1093/bja/ael256" },
  { id: 92, kind: "As cited in the manuscript; not independently re-verified.", text: "Loewen PS, Marra CA, Zed PJ. 5-HT3 receptor antagonists vs traditional agents for the prophylaxis of postoperative nausea and vomiting. Can J Anaesth. 2000;47(10):1008-1018.", url: "https://doi.org/10.1007/BF03024875" },
  { id: 93, kind: "As cited in the manuscript; not independently re-verified.", text: "Weibel S, Rücker G, Eberhart LH, Pace NL, Hartl HM, Jordan OL, et al. Drugs for preventing postoperative nausea and vomiting in adults after general anaesthesia: a network meta-analysis. Cochrane Database Syst Rev. 2020;10(10):CD012859.", url: "https://doi.org/10.1002/14651858.CD012859.pub2" },
  { id: 94, kind: "As cited in the manuscript; not independently re-verified.", text: "Sridharan K, Sivaramakrishnan G. Drugs for preventing post-operative nausea and vomiting in patients undergoing laparoscopic cholecystectomy: network meta-analysis of randomized clinical trials and trial sequential analysis. Int J Surg. 2019;69:1-12.", url: "https://doi.org/10.1016/j.ijsu.2019.07.002" },
  { id: 95, kind: "As cited in the manuscript; not independently re-verified.", text: "De Oliveira GS, Castro-Alves LJ, Chang R, Yaghmour E, McCarthy RJ. Systemic metoclopramide to prevent postoperative nausea and vomiting: a meta-analysis without Fujii's studies. Br J Anaesth. 2012;109(5):688-697.", url: "https://doi.org/10.1093/bja/aes325" },
  { id: 96, kind: "As cited in the manuscript; not independently re-verified.", text: "Wallenborn J, Gelbrich G, Bulst D, Behrends K, Wallenborn H, Rohrbach A, et al. Prevention of postoperative nausea and vomiting by metoclopramide combined with dexamethasone: randomised double blind multicentre trial. BMJ. 2006;333(7563):324.", url: "https://doi.org/10.1136/bmj.38903.419549.80" },
  { id: 97, kind: "As cited in the manuscript; not independently re-verified.", text: "Friedman BW, Bender B, Davitt M, Solorzano C, Paternoster J, Esses D, et al. A randomized trial of diphenhydramine as prophylaxis against metoclopramide-induced akathisia in nauseated emergency department patients. Ann Emerg Med. 2008;53(3):379-385.", url: "https://doi.org/10.1016/j.annemergmed.2008.08.003" },
  { id: 98, kind: "As cited in the manuscript; not independently re-verified.", text: "Lau Moon Lin M, Robinson PD, Flank J, Sung L, Dupuis LL. The safety of metoclopramide in children: a systematic review and meta-analysis. Drug Saf. 2016;39(7):675-687.", url: "https://doi.org/10.1007/s40264-016-0418-9" },
  { id: 99, kind: "As cited in the manuscript; not independently re-verified.", text: "Gray M, Priyanka P, Kane-Gill S, Wang L, Kellum JA. Kidney and mortality outcomes associated with ondansetron in critically ill patients. J Intensive Care Med. 2022;37(10):1403-1410.", url: "https://doi.org/10.1177/08850666211073582" },
  { id: 100, kind: "As cited in the manuscript; not independently re-verified.", text: "Pasternak B, Svanström H, Mølgaard-Nielsen D, Melbye M, Hviid A. Metoclopramide in pregnancy and risk of major congenital malformations and fetal death. JAMA. 2013;310(15):1601-1611.", url: "https://doi.org/10.1001/jama.2013.278343" },
  { id: 101, kind: "As cited in the manuscript; not independently re-verified.", text: "Pasternak B, Svanström H, Hviid A. Ondansetron in pregnancy and risk of adverse fetal outcomes. N Engl J Med. 2013;368(9):814-823.", url: "https://doi.org/10.1056/NEJMoa1211035" },
  { id: 102, kind: "As cited in the manuscript; not independently re-verified.", text: "Huybrechts KF, Hernández-Díaz S, Straub L, Gray KJ, Zhu Y, Patorno E, et al. Association of maternal first-trimester ondansetron use with cardiac malformations and oral clefts in offspring. JAMA. 2018;320(23):2429-2437.", url: "https://doi.org/10.1001/jama.2018.18307" },
  { id: 103, kind: "As cited in the manuscript; not independently re-verified.", text: "Sakran R, Shechtman S, Arnon J, Diav-Citrin O. Pregnancy outcome following in-utero exposure to ondansetron: a prospective comparative observational study. Reprod Toxicol. 2020;99:9-14.", url: "https://doi.org/10.1016/j.reprotox.2020.11.005" },
  { id: 104, kind: "As cited in the manuscript; not independently re-verified.", text: "Bérard A, Sheehy O, Gorgui J, Zhao JP, Soares de Moura C, Bernatsky S. New evidence for concern over the risk of birth defects from medications for nausea and vomitting of pregnancy. J Clin Epidemiol. 2019;116:39-48.", url: "https://doi.org/10.1016/j.jclinepi.2019.07.014" },
  { id: 105, kind: "As cited in the manuscript; not independently re-verified.", text: "Cho Y, Choi EY, Han JY, Kim H, Choe YJ, Shin JY. Antiemetic use during pregnancy and child neurodevelopment: population-based birth cohort study. BMC Med. 2025;23(1):667.", url: "https://doi.org/10.1186/s12916-025-04497-x" },
];
const NODES = [
  {
    id: "start",
    type: "terminal",
    tone: "key",
    label: "Adult or child with nausea and/or vomiting in whom an antiemetic is considered",
    meaning: "Entry point for any adult or child whose nausea and/or vomiting is significant enough that the clinician is considering an antiemetic drug — the point at which a choice between metoclopramide and ondansetron first arises.",
    rationale: "Metoclopramide and ondansetron are the antiemetics most often prescribed in general medical practice, but the review's central finding is that they are not interchangeable: which one performs better depends on the emetic pathway actually driving the patient's vomiting. Where vomiting is driven by serotonin release from enterochromaffin cells activating vagal 5-HT3 receptors (chemotherapy, radionuclide therapy, gut inflammation in paediatric gastroenteritis, and surgery/anaesthesia), ondansetron clearly outperforms conventional-dose metoclopramide; where the trigger is heterogeneous or hormonal (undifferentiated adult ED nausea, hyperemesis gravidarum), the two drugs perform equivalently and the choice should instead be guided by tolerability, comorbidity and cost.",
    refs: [1, 3, 4]
  },
  {
    id: "initial-assessment",
    type: "process",
    label: "Initial assessment",
    sub: "Identify and treat the underlying cause; correct fluid and electrolyte deficits (potassium, magnesium); exclude red flags requiring specific management (bowel obstruction, raised intracranial pressure, acute coronary syndrome, diabetic ketoacidosis, intoxication)",
    meaning: "Before an antiemetic is chosen, identify and treat whatever is actually causing the nausea or vomiting, correct fluid and electrolyte deficits (particularly potassium and magnesium), and exclude red-flag diagnoses that need their own specific management rather than symptomatic antiemetic therapy.",
    rationale: "Electrolyte correction here is not an isolated step: hypokalaemia and hypomagnesaemia are two of the three risk factors this same figure flags later, at the drug-specific safety check, as reasons to avoid or limit intravenous ondansetron — correcting them before an antiemetic is chosen directly reduces that downstream risk.",
    cautions: [
      "This box's content — treating the underlying cause, correcting potassium/magnesium, and excluding these specific red-flag diagnoses — does not appear anywhere in the systematic review's own extracted text. The review's scope is a head-to-head efficacy/safety comparison between metoclopramide and ondansetron, not a diagnostic work-up of nausea and vomiting; this box is general clinical background the figure adds independently of the review's own synthesis.",
    ],
    refs: []
  },
  {
    id: "setting-decision",
    type: "decision",
    label: "What is the clinical setting?",
    meaning: "The branch point: the review found that the relative performance of metoclopramide and ondansetron is setting-dependent, so the next step is identifying which of six clinical contexts the patient is in.",
    rationale: "Each of the six settings below draws on a different subset of the review's 73 included reports, with its own certainty rating — which is why the recommendation differs from branch to branch rather than applying one single rule to every patient.",
    refs: []
  },
  {
    id: "chemo-setting",
    type: "process",
    label: "Emetogenic chemotherapy or\nradionuclide therapy",
    meaning: "Patients receiving emetogenic chemotherapy (e.g. cisplatin- or FAC-based regimens) or radionuclide therapy (e.g. radioiodine for differentiated thyroid cancer).",
    rationale: "Cytotoxic chemotherapy and therapeutic radiation release serotonin from enterochromaffin cells in the gut wall, activating vagal afferent 5-HT3 receptors — the same pathway ondansetron blocks — producing the largest, most consistent advantage for ondansetron of any setting in this review.",
    refs: [3, 4]
  },
  {
    id: "chemo-rec",
    type: "process",
    label: "Ondansetron preferred [GRADE: low]",
    sub: "Base prophylaxis on a 5-HT3 antagonist as per antiemetic guidelines;\nconventional-dose metoclopramide is less effective (d 0.81 to 1.51).",
    meaning: "Ondansetron (or another 5-HT3 antagonist) should form the basis of antiemetic prophylaxis in this setting; conventional-dose metoclopramide is a weaker option.",
    rationale: "Six primary studies (seven reports) directly compared the drugs in oncology settings, all rated High risk of bias and predating modern triple/quadruple antiemetic prophylaxis standards. Effect sizes uniformly favoured ondansetron and exceeded the 0.5 MCID: complete acute vomiting control 93% vs 65% in FAC chemotherapy (Bosnjak, d = 1.10) [55]; complete suppression 65% vs 30% at low-dose cisplatin (Bhatia, d = 0.81) [56], with a similar advantage at the high dose and in the delayed phase [57]; complete acute emesis control 90% vs 36.7% with cisplatin and cyclophosphamide, both regimens combined with dexamethasone and lorazepam (Manusirivithaya, d = 1.51) [58]. Ondansetron also pulled ahead from the second chemotherapy course onward in a repeated-courses trial (Raynov) [59], and outperformed metoclopramide and pantoprazole for nausea (though neither prevented vomiting) after radioiodine therapy (Mirzababaee) [60], a finding echoed in a large non-randomised radioiodine cohort (Li, n = 1755) [61]. GRADE certainty for the core chemotherapy comparison is Low — rated down for risk of bias and indirectness, since the included trials predate current multi-agent prophylaxis regimens.",
    cautions: [
      "All six oncology comparator studies were rated High risk of bias (or Serious by ROBINS-I, for the one non-randomised cohort); none reflects current triple/quadruple antiemetic prophylaxis practice, so the effect sizes shown here describe ondansetron against metoclopramide specifically, not against modern standard-of-care combination prophylaxis.",
      "This recommendation aligns with the ASCO Antiemetics Guideline Update (Hesketh et al., 2020) [8], which places 5-HT3 antagonists within triple/quadruple regimens and reserves metoclopramide for a secondary role — an external guideline the review cites rather than a finding from its own pooled comparative data.",
    ],
    refs: [8, 55, 56, 57, 58, 59, 60, 61]
  },
  {
    id: "perioperative-setting",
    type: "process",
    label: "Perioperative period (PONV\nprophylaxis)",
    meaning: "Patients requiring antiemetic prophylaxis for postoperative nausea and vomiting (PONV) around the time of surgery.",
    rationale: "Surgery and anaesthesia activate the same serotonergic emetic pathway as chemotherapy (gut and vagal afferent 5-HT3 receptors). This is the largest single evidence base in the review: 27 head-to-head trials and 6 syntheses.",
    refs: [3, 4]
  },
  {
    id: "perioperative-rec",
    type: "process",
    label: "Ondansetron preferred [GRADE: moderate]",
    sub: "Modest advantage (pooled d 0.61; largest trials d ≈ 0.3). Metoclopramide\nremains acceptable within multimodal prophylaxis.",
    meaning: "Ondansetron (or another 5-HT3 antagonist) should form the basis of PONV prophylaxis, but the advantage over metoclopramide is real yet modest — metoclopramide remains an acceptable component of multimodal prophylaxis rather than a drug to avoid.",
    rationale: "Across 24 head-to-head prophylaxis trials, 13 favoured ondansetron on at least one emetic outcome, 11 showed no significant difference, and none showed metoclopramide superior for emesis. A laparoscopic cholecystectomy meta-analysis reached the MCID (pooled d = 0.61, Wu) [89], but the two largest individual trials showed smaller effects (Krobbuaban d = 0.29 [71]; Bolton d = 0.31 [63]) — the ‘largest trials d ≈ 0.3’ this box cites — indicating the true advantage is real but modest. Metoclopramide 10 mg still reduced 24-hour PONV against control in its own 30-trial meta-analysis (De Oliveira, odds ratio 0.58) [95], supporting its continued place in multimodal regimens. GRADE certainty is Moderate, rated down for risk of bias across the 27 trials.",
    cautions: [
      "Routine combination of ondansetron plus metoclopramide is explicitly NOT supported by this review: a factorial paediatric adenotonsillectomy trial found a negative interaction between the two drugs when combined (Gunter) [64], whereas ondansetron plus dexamethasone performed best in a seven-group comparison (Leksowski) [83] — the evidence favours combining ondansetron with a drug from a different class, not with metoclopramide.",
      "One trial in this evidence base (Quaynor, laparoscopic cholecystectomy, OND 8 mg vs MTC 20 mg) found metoclopramide associated with less postoperative pain than ondansetron, with no significant difference in PONV itself [78] — the review's only finding anywhere in the perioperative literature pointing toward a metoclopramide-favouring outcome, though it concerns pain rather than emesis.",
      "This recommendation aligns with the Fourth Consensus Guidelines for the Management of PONV (Gan et al., 2020) [7], which places 5-HT3 antagonists at the centre of prophylaxis and reserves metoclopramide for a secondary role — an external guideline the review cites rather than a finding from its own pooled data.",
    ],
    refs: [7, 63, 64, 71, 78, 83, 89, 95]
  },
  {
    id: "pediatric-setting",
    type: "process",
    label: "Child with acute\ngastroenteritis",
    meaning: "Children presenting with vomiting due to acute gastroenteritis.",
    rationale: "Gut inflammation in paediatric gastroenteritis releases serotonin from enterochromaffin cells via the same 5-HT3 pathway as chemotherapy, favouring ondansetron. This is also the setting with the clearest practical stake, since controlling vomiting is what allows oral rehydration therapy to proceed instead of IV fluids or admission.",
    refs: [3, 4]
  },
  {
    id: "pediatric-rec",
    type: "process",
    label: "Ondansetron preferred (0.1 to 0.15 mg/kg)\n[GRADE: low]",
    sub: "Facilitates oral rehydration; benefit exceeds MCID at 24 h (d 0.70 to 1.44).\nAvoid routine metoclopramide (extrapyramidal effects ≈ 9%).",
    meaning: "Ondansetron (0.1 to 0.15 mg/kg) should be preferred over metoclopramide, which should not be used routinely because of its extrapyramidal side-effect rate in children.",
    rationale: "Early control at 1 hour is similar between the drugs, but ondansetron provides significantly more durable cessation of vomiting at 24 hours, with effect sizes exceeding the 0.5 MCID in two of three head-to-head trials: Epifanio found 96.6% vs 67.2% vomiting-free at 24 h (d = 1.44) [35], and Ahmad found 92.5% vs 77.5% (d = 0.70) [36]; Al-Ansari's single-IV-dose trial did not reach the MCID (d = 0.27) [34]. Five further syntheses support ondansetron: a Bayesian-updated Cochrane review found no evidence supporting metoclopramide at all [46,47], a 24-trial network meta-analysis (Niño-Serna) found ondansetron the only intervention that reduced vomiting, hospitalisation and IV rehydration versus placebo [48], and a 33-trial network meta-analysis (Alsabri) found IV ondansetron improved 24-hour vomiting cessation with fewer adverse events [50]. The extrapyramidal-effects figure this box cites (≈9%) comes from a dedicated paediatric metoclopramide safety meta-analysis, which also found a 6% sedation rate (Lau Moon Lin) [98]. GRADE certainty is Low, rated down for risk of bias and inconsistency across the 3 head-to-head trials.",
    cautions: [
      "Risk-of-bias ratings varied considerably across the three head-to-head trials behind this recommendation: RoB 2: Some concerns for Al-Ansari [34] and Epifanio [35], but RoB 2: High for Ahmad [36] — the single-blind trial that showed the larger, MCID-exceeding effect at 24 hours is also the more bias-prone one.",
    ],
    refs: [34, 35, 36, 46, 47, 48, 50, 98]
  },
  {
    id: "pregnancy-setting",
    type: "process",
    label: "Pregnancy: hyperemesis\ngravidarum",
    meaning: "Pregnant patients with hyperemesis gravidarum, after first-line therapy has failed.",
    rationale: "Nausea and vomiting of pregnancy is hormonally driven rather than following the serotonergic or dopaminergic pathways the other settings turn on — part of why efficacy here is equivalent between the two drugs rather than favouring one of them.",
    refs: []
  },
  {
    id: "pregnancy-rec",
    type: "process",
    label: "Either drug as second-line therapy\n[GRADE: moderate]",
    sub: "Equivalent symptom control. Ondansetron better tolerated (less drowsiness);\nmetoclopramide if cost or first-trimester exposure concerns predominate.",
    meaning: "Either drug is a reasonable second-line choice: symptom control is equivalent, but ondansetron is better tolerated, while metoclopramide may be preferred where cost or first-trimester fetal-exposure concerns predominate.",
    rationale: "The largest RCT (Abas, n = 160) found no difference in 24-hour well-being score, vomiting episodes, or nausea trajectory, but drowsiness (30% vs 12.5%) and dry mouth (23.8% vs 10.0%) were roughly twice as frequent with metoclopramide — the drowsiness difference reaches the MCID (d = 0.61) [41], and a Cochrane review confirms both differences (drowsiness risk ratio 2.40; dry mouth risk ratio 2.38) with moderate-quality evidence [52]. A second RCT found a vomiting-score trend favouring ondansetron [42], while the EMPOWER pilot factorial RCT closed without a between-group analysis because most eligible women had already received one of the study drugs [43]. A meta-analysis of 5 RCTs (695 women, 3 of which were not indexed in PubMed and could not be individually appraised) found no important difference in symptom scores or hospital stay [51]. On fetal safety: Danish registry data found no increase in major malformations with either drug [100,101], but a large US cohort (1.8 million pregnancies) found a small increase in oral clefts with first-trimester ondansetron exposure — about three additional cases per 10 000 births [102] — while a Canadian cohort found a modest increase in major malformations with first-trimester metoclopramide, though based on only 31 ondansetron-exposed pregnancies [104]. GRADE certainty is Moderate for both symptom control and the drowsiness/dry-mouth difference.",
    cautions: [
      "Fetal/neurodevelopmental safety data point in different directions depending on the cohort: the oral-cleft signal for ondansetron [102] and the malformation signal for metoclopramide [104] both reached statistical significance in their respective cohorts, but a prospective comparative study found no significant difference in major anomalies between the drugs [103], and a Korean birth-cohort study of 630 904 children found no substantial overall neurodevelopmental association for either drug, with only a slightly higher ADHD risk after second-half-of-pregnancy metoclopramide exposure [105] — this is not a settled question.",
      "One source in this evidence base (Klauser, a cohort of home subcutaneous-infusion therapy, ROBINS-I: Serious) contains an internal inconsistency the review itself flags: its own Section 3.5 text states time to symptom improvement was similar (median 2 vs 3 days), while its Table 2 states the reverse (median 3 vs 2 days, OND vs MTC) [44].",
    ],
    refs: [41, 42, 43, 44, 51, 52, 100, 101, 102, 103, 104, 105]
  },
  {
    id: "ed-setting",
    type: "process",
    label: "Adult with undifferentiated\nnausea in the ED",
    meaning: "Adults presenting with undifferentiated nausea and/or vomiting in the emergency department, where pain, opioids, vestibular disturbance, metabolic disorders and gastric stasis may all contribute.",
    refs: []
  },
  {
    id: "ed-rec",
    type: "process",
    label: "Either drug; choose by safety profile\n[GRADE: moderate]",
    sub: "Differences below MCID; large placebo response. Ondansetron 4 mg IV or\nmetoclopramide 10 mg IV over 15 min; doses > 10 mg add no benefit.",
    meaning: "Either drug is reasonable — symptom relief is indistinguishable between them and neither clearly beats placebo. Choose by safety profile: ondansetron 4 mg IV or metoclopramide 10 mg IV given over 15 minutes; raising the metoclopramide dose above 10 mg adds no benefit.",
    rationale: "The two largest head-to-head trials found essentially no difference: Egerton-Warburton (n = 258) found a 27 mm vs 28 mm VAS fall at 30 minutes, neither exceeding the 23 mm placebo-arm fall (d = -0.04, negligible, MCID not reached) [26]; Feiz Disfani's mild-head-trauma trial found 23.6 vs 25.9 mm against a 31.9 mm placebo fall (d = 0.10, negligible) [29]. A Cochrane review of 8 trials (952 participants) found both drugs barely separated from placebo at 30 minutes [9], and a Bayesian network meta-analysis ranked oral ondansetron among the least effective options while IV ondansetron was the most likely to be free of significant adverse reactions [10]. The ‘doses above 10 mg add no benefit’ statement draws on two sources: no trial in medical (non-surgical) patients showed higher metoclopramide doses improving symptom relief, while 20 mg increased akathisia versus 10 mg (15% vs 9%) [26,27,97]. A 2009 narrative review had proposed ondansetron as first-line on safety grounds [6], an external recommendation the review's own head-to-head data do not clearly bear out for efficacy. GRADE certainty is Moderate (4 RCTs, n = 665, plus 2 syntheses), rated down for risk of bias.",
    dose: [
      ["Figure", "Ondansetron 4 mg IV or metoclopramide 10 mg IV over 15 min; doses > 10 mg add no benefit"],
      ["Table 1 (full range across included studies)", "Ondansetron 4 mg (range 4 to 8 mg) IV, 8 to 24 mg orally; metoclopramide 10 mg (range 10 to 20 mg) IV or orally"],
    ],
    cautions: [
      "One trial behind this box (Jokar, renal colic) was rated RoB 2: High, with the review itself noting: ‘Several trials were registered retrospectively, and in one the tabulated data were internally inconsistent’ [30].",
      "A borderline finding favoured metoclopramide in one trial — freedom from rescue medication (Egerton-Warburton, d = -0.49, small, borderline MCID) [26] — but the review notes this occurred at a 20 mg metoclopramide dose, which itself carries a higher akathisia risk than the 10 mg this box recommends [97].",
    ],
    refs: [6, 9, 10, 24, 26, 27, 29, 30, 97]
  },
  {
    id: "opioid-setting",
    type: "process",
    label: "Opioid-induced, uraemic,\nvestibular or palliative\nnausea",
    meaning: "Nausea with a mixed or less common aetiology: opioid-induced (e.g. in cancer patients), uraemic, vestibular (acute vestibular neuritis), or palliative-care nausea of hepatic origin.",
    refs: []
  },
  {
    id: "opioid-rec",
    type: "process",
    label: "No firm preference; individualise\n[GRADE: very low]",
    sub: "Single small trials only. Trend favouring metoclopramide in opioid-induced\nand ondansetron in uraemic nausea.",
    meaning: "Neither drug has a firm advantage here — the evidence is limited to single small trials, so the choice should be individualised. What trend exists favours metoclopramide for opioid-induced nausea and ondansetron for uraemic nausea.",
    rationale: "Pharmacologically, metoclopramide's prokinetic/D2-receptor-antagonist action has a rationale where gastric stasis or dopaminergic stimulation from opioids contributes, while a large effect favoured ondansetron in a small uraemia crossover trial. In opioid-induced cancer nausea, Hardy's multinational trial (stopped early after 92 patients due to slow recruitment) found complete nausea control numerically favouring metoclopramide (36% vs 17%, d = -0.56, moderate, technically reaching the MCID), but the confidence interval crossed zero and the difference was not significant [37]. In uraemia, Ljutić's small crossover trial (n = 10) found a large effect favouring ondansetron on both observer- and patient-rated scores (d = 2.42) [38] — a striking result, but from only 10 patients. In acute vestibular neuritis, ondansetron was associated with a shorter hospital stay (2.88 vs 4.5 days) in a 20-patient pilot trial, though nausea outcomes themselves were not reported [39]. In palliative-care hepatic-origin nausea, a non-randomised cohort (each arm also receiving dexamethasone, ROBINS-I: Serious) found no significant difference in improvement at day 7, with a lower post-treatment nausea score favouring metoclopramide (p = 0.002), an unadjusted comparison vulnerable to confounding by indication [40]. GRADE certainty is Very Low, rated down two levels for risk of bias and imprecision.",
    cautions: [
      "This is the lowest-certainty branch in the entire algorithm (GRADE: Very low) — three small RCTs (n = 122 total) and one non-randomised cohort across four distinct, mechanistically different causes of nausea, none large enough to support a confident recommendation either way.",
    ],
    refs: [37, 38, 39, 40]
  },
  {
    id: "safety-check-decision",
    type: "decision",
    label: "Before administration: drug-specific safety check",
    meaning: "Before giving either drug, check for the specific risk factors that make one drug preferable to the other, regardless of which of the six clinical settings the patient is in.",
    refs: []
  },
  {
    id: "qt-risk",
    type: "process",
    tone: "alarm",
    label: "Risk of QT prolongation?",
    sub: "Cardiac disease, hypokalaemia or hypomagnesaemia,\nother QT-prolonging drugs\n→ Avoid or limit IV ondansetron; prefer the oral route or\nmetoclopramide; obtain an ECG and correct electrolytes",
    meaning: "In patients with cardiac disease, hypokalaemia or hypomagnesaemia, or on other QT-prolonging drugs, avoid or limit intravenous ondansetron: prefer the oral route or metoclopramide, obtain an ECG, and correct electrolytes first.",
    rationale: "IV ondansetron 4 mg prolonged the QTc by a mean of 19.3 ms in hospitalised cardiovascular patients with torsades risk factors in a prospective observational study [25]. A post-marketing systematic review identified 60 arrhythmia reports associated with ondansetron: 80% followed IV administration, 83% involved significant medical history or a concomitant QT-prolonging drug, and none followed a single oral dose [12]. Reassuringly, zero arrhythmias were reported in any of the head-to-head trials in this review, though few of them performed ECG monitoring — meaning the trials were not designed to detect this risk, not that it doesn't exist.",
    cautions: [
      "The review's own stated limitations note that no included head-to-head trial was designed to detect arrhythmia, so the absence of reported events in trial data should not be read as reassurance equal in strength to the pharmacovigilance data above.",
    ],
    refs: [12, 25]
  },
  {
    id: "eps-risk",
    type: "process",
    tone: "alarm",
    label: "Risk of extrapyramidal effects or\nsedation?",
    sub: "Children, young adults, previous dystonia or akathisia,\nParkinson's disease\n→ Prefer ondansetron; if metoclopramide is used: 10 mg\ninfused over 15 min, lowest effective dose, short course",
    meaning: "In children, young adults, patients with a previous dystonic reaction or akathisia, or Parkinson's disease, prefer ondansetron; if metoclopramide must be used, give 10 mg infused over 15 minutes, at the lowest effective dose, for the shortest course.",
    rationale: "Metoclopramide's dopamine D2-receptor blockade in the chemoreceptor trigger zone — the same action behind its antiemetic effect — also produces its characteristic extrapyramidal side effects. Drowsiness/sedation ranged from 13.3% to 43.3% across trials, roughly double the ondansetron rate in several head-to-head comparisons, and was also higher with metoclopramide in FAC chemotherapy and in epidural caesarean delivery [28,41,55,62]; dry mouth was similarly about twice as frequent (23.8% vs 10.0%) [41,52]. Acute dystonia occurred in 5 of 60 patients on metoclopramide versus 0 on ondansetron in one head-trauma trial [28], though 0 extrapyramidal events were seen in three other trials [29,34,40]. Slowing the infusion is a specifically evidence-based mitigation: a 15-minute infusion reduced akathisia from 24.7% (after a 2-minute bolus) to 5.8% [24], and prophylactic diphenhydramine did not help — 12% akathisia in both arms [97] — so dose and infusion rate matter more than premedication. Long-term exposure carries a boxed regulatory warning for tardive dyskinesia, estimated at under 1%, though this is not relevant to the short courses used for acute nausea and vomiting [5,11].",
    dose: [
      ["Figure", "If metoclopramide is used: 10 mg infused over 15 minutes, lowest effective dose, short course"],
      ["Section 3.2, Table 1 (full range)", "10 mg (range 10 to 20 mg) IV or orally, up to three or four times daily"],
    ],
    cautions: [
      "The tardive dyskinesia boxed warning [5] concerns prolonged/long-term metoclopramide exposure and is not clinically relevant to the single or short-course acute dosing this algorithm addresses — the review includes it as a known regulatory fact about the drug class, not as a risk specific to acute antiemetic use.",
    ],
    refs: [5, 11, 24, 28, 29, 34, 40, 41, 52, 55, 62, 97]
  },
  {
    id: "reassess",
    type: "process",
    label: "Reassess at 30 to 60 minutes",
    sub: "Controlled: continue or switch to the oral route. Persistent: add an agent\nof a different class rather than escalating the dose, and reconsider\nthe diagnosis.",
    meaning: "At 30 to 60 minutes: if symptoms are controlled, continue the current drug or switch to the oral route; if they persist, add an agent from a different pharmacological class rather than simply escalating the dose of the same drug, and reconsider whether the working diagnosis is correct.",
    rationale: "The instruction to add a different class ‘rather than escalating the dose’ is consistent with the review's own dose-response findings for metoclopramide specifically: no evidence in medical patients that doses above 10 mg improve symptom relief, while 20 mg increases akathisia risk compared with 10 mg (15% vs 9%) [26,27,97] — escalating this particular drug's dose trades a higher side-effect rate for no proven extra benefit.",
    cautions: [
      "Like the Initial assessment box, this closing step does not appear in the systematic review's own extracted text — the review compares the two drugs' efficacy and safety, but does not describe a reassessment protocol or timeframe. This is general clinical practice the figure adds independently of the review's own synthesis.",
    ],
    refs: [26, 27, 97]
  },
];
const GLOSSARY = [
  { match: "GRADE", full: "Grading of Recommendations Assessment, Development and Evaluation", def: "A structured framework for rating how confident clinicians should be in a body of evidence, from very low to high certainty, based on risk of bias, inconsistency, indirectness, imprecision and publication bias." },
  { match: "MCID", full: "Minimal Clinically Important Difference", def: "The smallest difference in an outcome that patients or clinicians would consider meaningful. This review uses a Cohen's d of 0.5 (half a standard deviation) as the cutoff, so a statistically significant finding below that threshold is not treated as clinically important." },
  { match: "VAS", full: "Visual Analogue Scale", def: "A patient-reported symptom-intensity scale, typically a 100 mm line the patient marks between ‘none’ and ‘worst imaginable’, used throughout this review to quantify nausea severity and change over time." },
  { match: "RoB 2", full: "Cochrane Risk of Bias 2", def: "The standard Cochrane tool for assessing risk of bias in randomised trials, rating each trial as low risk, some concerns, or high risk across several bias domains." },
  { match: "ROBINS-I", full: "Risk Of Bias In Non-randomised Studies - of Interventions", def: "The companion tool to RoB 2 for assessing bias in non-randomised comparative studies; its ratings top out at ‘serious’ or worse because such studies cannot fully control for confounding by indication." },
  { match: "PONV", full: "Postoperative Nausea and Vomiting", def: "Nausea and vomiting occurring after surgery and anaesthesia, usually within the first 24 hours — the single largest evidence base in this review (27 trials, 6 syntheses)." },
  { match: "5-HT3", full: "Serotonin type-3 receptor", def: "A vagal-afferent and chemoreceptor-trigger-zone receptor activated by serotonin released from gut enterochromaffin cells. Ondansetron's antiemetic effect comes from blocking this receptor." },
  { match: "D2-receptor", full: "Dopamine type-2 receptor", def: "The receptor metoclopramide blocks in the chemoreceptor trigger zone to produce its antiemetic and prokinetic effects — the same mechanism responsible for its extrapyramidal side effects." },
  { match: "chemoreceptor trigger zone", full: "CTZ", def: "A region in the brainstem, outside the blood–brain barrier, that senses circulating drugs and toxins and triggers vomiting when stimulated via dopamine D2 or serotonin 5-HT3 receptors — the shared anatomical target of both drugs in this review." },
  { match: "QTc", full: "Corrected QT interval", def: "The QT interval on the ECG adjusted for heart rate. Prolongation increases the risk of torsades de pointes — the mechanism behind this algorithm's intravenous-ondansetron caution." },
  { match: "network meta-analysis", full: "NMA", def: "A meta-analysis technique that combines direct and indirect trial comparisons to rank three or more treatments against each other even when not every pair has been tested head-to-head." },
  { match: "ASCO", full: "American Society of Clinical Oncology", def: "The guideline body whose Antiemetics Guideline Update (2020) this review cites as recommending 5-HT3 antagonists within multi-agent chemotherapy prophylaxis regimens." },
  { match: "akathisia", def: "A subjective, distressing sense of inner restlessness and inability to stay still — an extrapyramidal side effect of dopamine-blocking drugs like metoclopramide, easily mistaken for the nausea or agitation being treated." },
  { match: "dystonia", def: "Sustained, involuntary muscle contraction (of the neck, jaw, or eyes, for instance) — another extrapyramidal reaction to dopamine blockade, distinct from akathisia." },
  { match: "tardive dyskinesia", def: "A potentially irreversible movement disorder (repetitive, involuntary movements, often of the face and tongue) associated with prolonged dopamine-blocking drug exposure — the subject of metoclopramide's boxed regulatory warning, estimated at under 1% with long-term use." },
];

const AGENTS = [
  "Metoclopramide",
  "Ondansetron",
  "Dexamethasone",
  "Lorazepam",
  "Diphenhydramine",
  "Pantoprazole",
];
