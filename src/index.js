console.log("entered index.js");
import * as vg from '@uwdata/vgplot';
console.log("imported vgplot");

async function loadData() {
    console.log("entered loadData");
    try {
        await vg.coordinator().exec([
            `
            CREATE TEMP TABLE IF NOT EXISTS flights200k AS 
            SELECT 
                GREATEST(-60, LEAST(ARR_DELAY, 180))::DOUBLE AS delay,
                DISTANCE AS distance,
                DEP_TIME AS time 
            FROM 'flights-200k.parquet'
            `
        ]);
        console.log("created temp table");
    } catch (error) {
        console.error("Error creating temp table:", error);
    }
    console.log("successfully loaded data");

    const $brush = vg.Selection.crossfilter();

    document.body.appendChild(
        vg.vconcat(
            vg.plot(
                vg.rectY(
                    vg.from("flights200k", { filterBy: $brush }),
                    { x: vg.bin("delay"), y: vg.count(), fill: "steelblue", inset: 0.5 }
                ),
                vg.intervalX({ as: $brush }),
                vg.xDomain(vg.Fixed),
                vg.marginLeft(75),
                vg.width(600),
                vg.height(200)
            ),
            vg.plot(
                vg.rectY(
                    vg.from("flights200k", { filterBy: $brush }),
                    { x: vg.bin("time"), y: vg.count(), fill: "steelblue", inset: 0.5 }
                ),
                vg.intervalX({ as: $brush }),
                vg.xDomain(vg.Fixed),
                vg.marginLeft(75),
                vg.width(600),
                vg.height(200)
            ),
            vg.plot(
                vg.rectY(
                    vg.from("flights200k", { filterBy: $brush }),
                    { x: vg.bin("distance"), y: vg.count(), fill: "steelblue", inset: 0.5 }
                ),
                vg.intervalX({ as: $brush }),
                vg.xDomain(vg.Fixed),
                vg.marginLeft(75),
                vg.width(600),
                vg.height(200)
            )
        )
    );
}

loadData().catch(console.error);
console.log("exited index.js");
