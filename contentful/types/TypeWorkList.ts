import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeWorkSkeleton } from "./TypeWork";

export interface TypeWorkListFields {
    sectionTitle: EntryFieldTypes.Symbol;
    workData: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeWorkSkeleton>>;
}

export type TypeWorkListSkeleton = EntrySkeletonType<TypeWorkListFields, "workList">;
export type TypeWorkList<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkListSkeleton, Modifiers, Locales>;
