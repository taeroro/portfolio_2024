import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWorkDetailContentMediaFields {
    mediaType: EntryFieldTypes.Symbol<"Image" | "Video">;
    size: EntryFieldTypes.Symbol<"Full" | "Half">;
    image?: EntryFieldTypes.AssetLink;
    secondImage?: EntryFieldTypes.AssetLink;
    videoLink?: EntryFieldTypes.Symbol;
    showOutline: EntryFieldTypes.Boolean;
}

export type TypeWorkDetailContentMediaSkeleton = EntrySkeletonType<TypeWorkDetailContentMediaFields, "workDetailContentMedia">;
export type TypeWorkDetailContentMedia<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkDetailContentMediaSkeleton, Modifiers, Locales>;
