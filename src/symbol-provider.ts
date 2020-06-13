import * as vs from 'vscode';

const FUNCTION_REGEX = /f[uo]nction\/\s*([a-z_]*)/i;
const END_FUNCTION_REGEX = /(end|fin)\/\s*f[uo]nction/i;
const VAR_REGEX = /(?:fix|set)\/\s*([a-z_]*)/i;

function variableExistinContext(name: string, contexts: string[][]) {
	for (let ctx of contexts) {
		console.log(ctx);
		if (ctx.findIndex(item => item.toUpperCase() == name.toUpperCase()) > 0) {
			return true;
		}
	}
	return false;
}

export default class SymbolProvider implements vs.DocumentSymbolProvider {
	provideDocumentSymbols(document: vs.TextDocument, token: vs.CancellationToken): vs.ProviderResult<vs.SymbolInformation[] | vs.DocumentSymbol[]> {
		let symbols: vs.DocumentSymbol[] = [];
		let variablesContext: string[][] = [[]];
		let parent = null;
		let matches;

		for (let i = 0; i < document.lineCount; i++) {
			let line = document.lineAt(i);


			if ((matches = line.text.match(FUNCTION_REGEX))) {
				parent = new vs.DocumentSymbol(
					matches[1],
					"Function",
					vs.SymbolKind.Function,
					line.range, line.range
				);
				variablesContext.push([]);
			}
			else if ((matches = line.text.match(END_FUNCTION_REGEX))) {
				if (parent) {
					symbols.push(parent);
					parent = null;
					variablesContext.pop();
				}
			}
			else if ((matches = line.text.match(VAR_REGEX))) {
				if (!variableExistinContext(matches[1], variablesContext)) {
					variablesContext[0].push(matches[1]);
					let val = new vs.DocumentSymbol(
						matches[1],
						"",
						vs.SymbolKind.Variable,
						line.range, line.range
					);

					if (parent) {
						parent.children.push(val);
					} else {
						symbols.push(val);
					}
				}
			}
		}

		return (symbols);
	}

}
