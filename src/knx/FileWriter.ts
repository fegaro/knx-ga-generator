import * as fs from "fs";
import {GroupAddress, sortGroupAdresses} from "./GroupAddress";

export class FileWriter {

    constructor(readonly file: string) {
    }

    async write(groupAddresses: GroupAddress[]) {
        groupAddresses = groupAddresses.sort(sortGroupAdresses)
        try {
            const header = `"Main";"Middle";"Sub";"Address";"Central";"Unfiltered";"Description";"DatapointType";"Security"\n`
            await fs.promises.writeFile(this.file, header, {encoding: "utf8"})
            for (const groupAddress of groupAddresses) {
                await fs.promises.writeFile(this.file, groupAddress.toCSV(), {encoding: "utf8", flag: 'a'})
            }
        } catch (err) {
            console.log(`Something went wrong during writing file: ${err}`)
        }
    }
}
