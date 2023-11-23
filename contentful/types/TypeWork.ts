import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeWorkDetailSkeleton } from "./TypeWorkDetail";

export interface TypeWorkFields {
    slug: EntryFieldTypes.Symbol;
    isPasswordProtected: EntryFieldTypes.Boolean;
    title: EntryFieldTypes.Symbol;
    overview: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    workDetailData: EntryFieldTypes.EntryLink<TypeWorkDetailSkeleton>;
}

export type TypeWorkSkeleton = EntrySkeletonType<TypeWorkFields, "work">;
export type TypeWork<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkSkeleton, Modifiers, Locales>;
