import { CodeLensData } from "./state-types";

const codeLensDataList: CodeLensData[] = [
    { tokenString: escapeRegExp(`console.log('blah');`), codeLensLabel: 'Run this' },
    { tokenString: `testing`, codeLensLabel: 'Yep' }
];

export const getCodeLensState = () :CodeLensData[] => {
    return codeLensDataList;
};

export const addCodeLens = (codeLensData: CodeLensData) => {
    codeLensDataList.push(codeLensData);
};

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}