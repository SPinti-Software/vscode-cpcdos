import * as vs from 'vscode';

export default class SymbolProvider implements vs.DocumentSymbolProvider {
    provideDocumentSymbols(document: vs.TextDocument, token: vs.CancellationToken): vs.ProviderResult<vs.SymbolInformation[] | vs.DocumentSymbol[]> {
        const fncRegExp = /f[uo]nction\/\s*([a-z_]*)/i;
        let symbols: vs.DocumentSymbol[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            let line  = document.lineAt(i);

            let matches = line.text.match(fncRegExp);
            if (matches) {
                symbols.push(new vs.DocumentSymbol(
                    matches[1],
                    'Function',
                    vs.SymbolKind.Function,
                    line.range, line.range
                ));
            }
        }

        return (symbols);
    }
    
}