import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSearchFields {
    placeholder: EntryFieldTypes.Symbol;
    prompt: EntryFieldTypes.Symbol;
    result?: EntryFieldTypes.Text;
}

export type TypeSearchSkeleton = EntrySkeletonType<TypeSearchFields, "search">;
export type TypeSearch<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSearchSkeleton, Modifiers, Locales>;
