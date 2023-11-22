import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWorkFields {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    overview: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
}

export type TypeWorkSkeleton = EntrySkeletonType<TypeWorkFields, "work">;
export type TypeWork<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkSkeleton, Modifiers, Locales>;
