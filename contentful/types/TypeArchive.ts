import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArchiveFields {
    client: EntryFieldTypes.Symbol;
    project: EntryFieldTypes.Symbol;
    category: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    isComingSoon: EntryFieldTypes.Boolean;
}

export type TypeArchiveSkeleton = EntrySkeletonType<TypeArchiveFields, "archive">;
export type TypeArchive<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArchiveSkeleton, Modifiers, Locales>;
