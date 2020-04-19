import * as vs from 'vscode';
import ColorProvider from './color-provider';

export function activate(context: vs.ExtensionContext) {
    context.subscriptions.push(
        vs.languages.registerColorProvider('cpc', new ColorProvider())
    );
}

export function deactivate() {

}