import * as vs from 'vscode';

export default class ColorProvider implements vs.DocumentColorProvider {
    
    provideColorPresentations(color: vs.Color, context: { document: vs.TextDocument; range: vs.Range; }, token: vs.CancellationToken): vs.ProviderResult<vs.ColorPresentation[]> {
        throw new Error("Method not implemented.");
    }

    provideDocumentColors(document: vs.TextDocument, token: vs.CancellationToken): vs.ProviderResult<vs.ColorInformation[]> {
        const colorRegExp = /((?:color|\.couleur[a-z]+)\s*=\s*)"([0-9]{3}),([0-9]{3}),([0-9]{3})"/gi;
        const colors = [];

        for (let lineNo = 0; lineNo < document.lineCount; lineNo++) {
            const text = document.lineAt(lineNo).text

            while (true) {
                const colorMatch = colorRegExp.exec(text)
                if (colorMatch === null) {
                    break
                }
                const colorIndex = colorMatch.index + colorMatch[1].length;
                const values = colorMatch.slice(2).map(Number);
                const range = new vs.Range(lineNo, colorIndex, lineNo, colorRegExp.lastIndex);
                const vscolor = new vs.Color(values[0] / 255, values[1] / 255, values[2] / 255, 1);
                colors.push(new vs.ColorInformation(
                    range,
                    vscolor
                ));
            }
        }

        return colors
    }

}