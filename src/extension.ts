import * as vs from 'vscode';
import ColorProvider from './color-provider';
import SymbolProvider from './symbol-provider';

export function activate(context: vs.ExtensionContext) {
    context.subscriptions.push(
        vs.languages.registerDocumentSymbolProvider('cpc', new SymbolProvider()),
        vs.languages.registerColorProvider('cpc', new ColorProvider())
    );
}

export function deactivate() {

}