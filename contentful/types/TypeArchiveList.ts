import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeArchiveSkeleton } from "./TypeArchive";

export interface TypeArchiveListFields {
    sectionTitle: EntryFieldTypes.Symbol;
    archiveData: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArchiveSkeleton>>;
}

export type TypeArchiveListSkeleton = EntrySkeletonType<TypeArchiveListFields, "archiveList">;
export type TypeArchiveList<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArchiveListSkeleton, Modifiers, Locales>;
