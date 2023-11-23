import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeWorkDetailContentSkeleton } from "./TypeWorkDetailContent";

export interface TypeWorkDetailFields {
    fullDescription: EntryFieldTypes.Text;
    role: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    category: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    agency?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    collaborator?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    deliverable: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    projectLink?: EntryFieldTypes.Symbol;
    workDetailContent: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeWorkDetailContentSkeleton>>;
}

export type TypeWorkDetailSkeleton = EntrySkeletonType<TypeWorkDetailFields, "workDetail">;
export type TypeWorkDetail<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkDetailSkeleton, Modifiers, Locales>;
