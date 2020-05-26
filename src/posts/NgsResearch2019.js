import React from "react"

import Ref from "../components/Writings/Ref"
import Fig from "../components/Writings/Fig"
import Table from "../components/Writings/Table"

class NgsResearch2019 extends React.Component {
    render() {
        const images = require.context("../images/posts/ngs-research-2019")

        return (<>
            <div class='content'>
                <p><b>Mentor:</b> Brianna Petrone</p>
                <p class='abstract'><b>Abstract:</b> Targeted amplicon sequencing can be used to qualitatively identify the species components of a pooled DNA sample. We evaluated whether the food-species components of processed foods can be identified, and if the next-generation sequencing strategy is useful in quantification. We also sought to find if food processing affected the quality of extractable DNA. DNA from three processed foods—white bread, multigrain bread, and hot dog—were extracted, amplified, and Illumina-sequenced. Preliminary analysis of the two breads using the trnLGH primer set showed expected composition of most food species, with high read counts for the grains used in the breads’ flours, and low counts for trace ingredients. Surprisingly, onion (<i>Allium cepa</i>) DNA was detected in both breads. Further analysis is needed.</p>
                <div class='line-break' />

                <h4 id='s1'>1. Motivation</h4>
                <p>Amplicon-based marker gene methods, also known as DNA metabarcoding, are next-generation sequencing techniques that are of interest in many areas of research, including microbiome studies,<Ref n='1' /> diet quantification,<Ref n='2' /> and food traceability.<Ref n='3' /> Through a metabarcoding approach, the components of a food can be reliably identified,<Ref n='3' /> and the strategy may also be useful in identifying and characterizing the components of processed foods. Existing literature suggests that the processing steps of such food results in the fragmentation and degradation of food- species DNA, though the amplification of such DNA is usually still possible.<Ref n='4' /></p>
                <p>In this project, we focused on the identification and characterization of food species that are present in processed foods. We sought to determine if food-species components can be identified from processed foods, and if such identifications reliably reflect the ingredients as reported by the manufacturer. We also sought to evaluate and characterize the identified food species by read count, which we assumed to be a crude measure of DNA presence and degradation.</p>
                <p>We predicted that reads for the foods’ main ingredients would be present in high amounts, while those listed as trace (“Contains 2% or less of”) would be present in low amounts or not at all.</p>

                <h4 id='s2'>2. Methods</h4>
                <h5 id='s2.1'>2.1. Processed Food Selection</h5>
                <p>To identify the dietary components of processed foods, we chose three candidates for extraction and analysis: Wonder® Classic Hot Dog Buns (“white bread”), Pepperidge Farm® Whole Grain 15-Grain Bread (“multigrain bread”), and Oscar Meyer® Uncured Bun-Length Wieners (“hot dogs”). The relevant ingredients reported for these foods, as well as the food species expected to be present in each, are listed below in <Table n='1' />.</p>
                <figure class='table' id='table1'>
                    <figcaption><b>Table 1</b> | <b>Ingredients and expected food species from processed foods.</b></figcaption>
                    <img
                        src={images("./table1.png")}
                        alt={"Table 1"}
                        style={{ width: "85%" }}
                    />
                </figure>
                <p>The three foods were purchased at a local grocery store and were representative of commonplace and widely consumed brands in the United States. These foods were chosen because they contain many different food species, are likely to be heavily processed, and represent staple foods that are expected to be present in a typical American diet. Also, each food represented multiple phyla in its makeup—the multigrain bread contained yeast and milk whey, while the hot dog contained cherry and celery—but it was unclear whether these atypical food species would be present in identifiable amounts. </p>
                <h5 id='s2.2'>2.2. DNA Extraction and Amplification</h5>
                <p>To extract DNA from the processed foods, each food was finely diced with a sterile razor blade and processed through the appropriate DNA extraction protocol—the Qiagen DNeasy PowerPlant Pro Kit for the white and multigrain breads, and the Qiagen DNeasy Blood & Tissue Kit for the hot dog. The extracted samples were then PCR-amplified with different primer sets. The white and multigrain breads extractions were amplified with the plant primer sets trnLCD and trnLGH. The hot dog extraction was amplified with the animal primer sets 12S and 12SV5; the animal/plant primer sets nucLSUD and Short28S; and the plant primer sets trnLCD, trnLGH, and UniPlant. In addition to the animal primer sets, the plant primers were also used to detect the trace genetic material from the plants listed in the hot dog’s ingredients. The primer sets are described in greater detail in <Table n='2' />.</p>
                <p>The first-round PCR products of the processed food DNA were then purified through 1:100 dilution in water, and a second round of PCR was conducted to append the amplicons with Illumina MiniSeq adapters and barcode them with dual indices. The barcodings for each processed PCR product are also shown in <Table n='2' />.</p>
                <figure class='table' id='table2'>
                    <figcaption><b>Table 2</b> | <b>Primer sets and dual indices used for processed food amplicons.</b></figcaption>
                    <img
                        src={images("./table2.png")}
                        alt={"Table 2"}
                        style={{ width: "75%" }}
                    />
                </figure>
                <p>The second-round PCR amplicons were purified according to the AMPure XP Beads protocol, and the amplicon pooling, purification for sequencing, and PhiX spike-in were carried out according to the standard David Lab protocol.</p>

                <h5 id='s2.3'>2.3. Bioinformatic Analysis</h5>
                <p>Reads from the Illumina MiniSeq data were converted to FASTQ format and demultiplexed with the Illumina <code>bcl2fastq</code> conversion software. The primer sequences were then trimmed with <code>cutadapt</code>,<Ref n='5' /> filtered to remove sequences containing low-quality nucleotide, and processed with the DADA2 package to learn errors and infer amplicon sequence variants (ASVs).<Ref n='6' /></p>
                <p>The trnLGH primer sets were used to perform an <i>in silico</i> PCR on a reference database of trnL sequences—belonging to 27 plant foods and gathered from the NCBI Nucleotide database—to trim the sequences into what would be expected in the processed-food amplicons. The trimmed reference database contained sequences for onion (<i>Allium cepa</i>), peanut (<i>Arachis hypogaea</i>), oat (<i>Avena sativa</i>), orange (<i>Citrus sinensis</i>), soy (<i>Glycine max</i>), sunflower (<i>Helianthus annuus</i>), barley (<i>Hordeum vulgare</i>), lettuce (<i>Lactuca sativa</i>), rice (<i>Oryza sativa</i>), black bean (<i>Phaseolus vulgaris</i>), cherry (<i>Prunus avium</i>), sugarcane (<i>Saccharum spp.</i>), tomato (<i>Solanum lycopersicum</i>), potato (<i>Solanum tuberosum</i>), sorghum (<i>Sorghum spp.</i>), wheat (<i>Triticum aestivum</i>), and corn (<i>Zea mays</i>).</p>
                <p>However, the trimmed database did not include sequences for celery (<i>Apium graveolens</i>), quinoa (<i>Chenopodium quinoa</i>), buckwheat (<i>Fagopyrum esculentum</i>), flax (<i>Linum usitatissimum</i>), apple (<i>Malus domestica</i>), millet (<i>Panicum miliaceum</i>), rye (<i>Secale cereale</i>), spelt (<i>Triticum spelt</i>), and grape (<i>Vitis vinifera</i>), either because the respective trnL gene could not be found in the NCBI Nucleotide database, or because the trnLGH primers were not in their sequences.</p>

                <h4 id='s3'>3. Results and Discussion</h4>
                <p>To characterize the dietary components of processed foods, we extracted DNA from three processed food candidates, amplified them using animal and/or plant primer sets, then barcoded them with dual-indexing PCR. The results of that PCR are shown in <Fig n='1' />.</p>
                <p>The gel in <Fig n='1' /> shows bright bands corresponding to both trnL primer sets for both breads, which was expected—bread, made of mostly grain, contains mostly plant genetic material. The hot dog, made of mostly animal matter, showed a distinct band of different size for each animal and animal/plant primer set. The hot dog amplifications for the three plant primer sets (trnLCD, trnLGH, and UniPlant) visualized as smears across the entire ladder range, with what appeared to be somewhat discrete bands in between. It was unclear whether this represented amplicons of trace plant material in the hot dog or artifacts of a failed amplification.</p>
                <figure class='fig' id='fig1'>
                    <img
                        src={images("./fig1.jpg")}
                        alt={"Figure 1"}
                        style={{ width: "60%" }}
                    />
                    <figcaption><b>Figure 1</b> | <b>Processed-food amplicons after second-round PCR.</b> Gel electrophoresis results of the processed-food amplicons after the second round of PCR. The first lane is the 100-bp ladder. WB stands for white bread, MGB for multigrain bread, and HD for hot dog. F stands for wheat flour, which was later excluded from this experiment for being redundant; both breads contained wheat flour.</figcaption>
                </figure>
                <p>Following targeted-amplicon sequencing, we analyzed reads for trnLGH sequences of white and multigrain breads. The ASV read counts were grouped by the identified species, or aggregated as “Other” if the ASV could not be identified to at least the genus level. The results of this preliminary analysis are shown in <Fig n='2' />.</p>
                <figure class='fig' id='fig2'>
                    <img
                        src={images("./fig2.png")}
                        alt={"Figure 2"}
                        style={{ width: "100%" }}
                    />
                    <figcaption><b>Figure 2</b> | <b>ASV read counts of trnLGH-amplified breads, by species.</b> Read counts of amplicon sequence variants, grouped by species, for trnLGH-amplified white (left) and multigrain (right) breads. Each species label indicates a nonzero read count for that species.</figcaption>
                </figure>
                <p>In white bread, the trnLGH primer set most amplified sequences corresponding to wheat (226,411 reads), soy (53,185 reads), and barley (3,141 reads). Trace ({`<`} 100 reads) amounts of onion, sorghum, and sunflower were also detected.</p>
                <p>In the multigrain bread, the primer set most amplified those corresponding to sunflower (190,981 reads), wheat (96,148 reads), oat (2,210 reads), and flax (2,197 reads). Trace ({`<`} 250 reads) amounts of barley, soy, sorghum, onion, rice, and potato were also detected.</p>
                <p>These results mostly match our expectations for the dietary components of the two processed foods. The white bread—whose ingredients included wheat and barley flours, wheat gluten, soybean oil, and soy flour—contained large amounts of wheat, barley, and soy DNA. And the multigrain bread—which listed sunflower seeds, oats, and various forms of wheat among its main ingredients—contained large amounts of DNA for each, with almost twice as many reads for sunflower than for wheat. Though this was unexpected—the main ingredient in most breads is a grain-based flour—it could be because the multigrain bread contained whole sunflower seeds that were relatively unprocessed compared to the highly processed wheat flour. The multigrain bread was also found to have prominent read counts for flax, even though flaxseed meal was listed as a trace ({`<`} 2%) ingredient. The trace ingredients of barley, sorghum, soy, and rice were also accounted for in trace amounts.</p>
                <p>The food species for main sweeteners in each bread—high-fructose corn syrup in white bread, and sugar in multigrain bread—were not detected. We predict that, in these extremely processed products, the corn and sugarcane DNA was too degraded or present in too few amounts to be detectable.</p>
                <p>Both breads were found to contain trace, yet detectable, amounts of onion, which was unexpected. Neither bread explicitly listed onion as one of its ingredients. It is possible that onion is a common feedstock for food additives manufacturing, and one or more of the trace additives were derived from onion. More research is needed to confirm this hypothesis.</p>
                <p>This preliminary analysis investigated only the amplicons from the trnLGH primer set, and for only two of the three processed foods initially studied. Many of the samples presented difficulties in analysis, and analyses of the other samples are ongoing. The logical next steps for this project are to resolve these difficulties and continue the bioinformatic analyses of all samples.</p>
                <p>Another next step is finding a practical method to quantify the amplicons generated. Though we attempted to do this at the beginning of the project, using plasmid constructs with the amplicons in single copy to use as quantitation standards, the transformation of competent <i>Escherichia coli</i> DH5α vectors was unsuccessful. Various cloning methods of template genomic DNA—including TA-cloning, blunt-ended ligation, and conventional cloning using the restriction enzyme EcoRI—were all unsuccessful.</p>
            </div>
            <div class='line-break' />

            <div class='refs'>
                <h4>References</h4>
                <ol>
                    <li id='ref1'>Gohl, D. M., Vangay, P., Garbe, J., MacLean, A., Hauge, A., Becker, A., … Beckman, K. B. (2016). Systematic improvement of amplicon marker gene methods for increased accuracy in microbiome studies. <i>Nature Biotechnology</i>, 34(9), 942–949.</li>
                    <li id='ref2'>Kartzinel, T. R., Chen, P. A., Coverdale, T. C., Erickson, D. L., Kress, W. J., Kuzmina, M. L., … Pringle, R. M. (2015). DNA metabarcoding illuminates dietary niche partitioning by African large herbivores. <i>Proceedings of the National Academy of Sciences</i>, 112(26), 8019–8024.</li>
                    <li id='ref3'>Galimberti, A., De Mattia, F., Losa, A., Bruni, I., Federici, S., Casiraghi, M., … Labra, M. (2013). DNA barcoding as a new tool for food traceability. <i>Food Research International</i>, 50(1), 55–63.</li>
                    <li id='ref4'>Gryson, N. (2010). Effect of food processing on plant DNA degradation and PCR-based GMO analysis: A review. <i>Analytical and Bioanalytical Chemistry</i>, 396(6), 2003–2022.</li>
                    <li id='ref5'>Martin, M. (2011). Cutadapt removes adapter sequences from high-throughput sequencing reads. <i>EMBnet.Journal</i>, 17(1), 10–12.</li>
                    <li id='ref6'>Callahan, B. J., McMurdie, P. J., Rosen, M. J., Han, A. W., Johnson, A. J. A., & Holmes, S. P. (2016). DADA2: High-resolution sample inference from Illumina amplicon data. <i>Nature Methods</i>, 13(7), 581–583.</li>
                </ol>
            </div>
        </>)
    }
}

export default NgsResearch2019
