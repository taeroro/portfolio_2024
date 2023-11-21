import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeSearchSkeleton } from "./TypeSearch";

export interface TypeWhoFields {
    sectionTitle: EntryFieldTypes.Symbol;
    subtitle: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    search?: EntryFieldTypes.EntryLink<TypeSearchSkeleton>;
}

export type TypeWhoSkeleton = EntrySkeletonType<TypeWhoFields, "who">;
export type TypeWho<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWhoSkeleton, Modifiers, Locales>;
