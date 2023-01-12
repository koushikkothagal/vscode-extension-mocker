import { CodeLensData } from "./state-types";

const codeLensDataList: CodeLensData[] = [
];

export const getCodeLensState = () :CodeLensData[] => {
    return codeLensDataList;
};

export const addCodeLens = (codeLensData: CodeLensData) => {
    codeLensData.tokenString = escapeRegExp(codeLensData.tokenString);
    codeLensDataList.push(codeLensData);
};

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}