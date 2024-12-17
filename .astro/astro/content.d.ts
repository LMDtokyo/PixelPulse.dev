declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"service-1/service-1.mdx": {
	id: "service-1/service-1.mdx";
  slug: "service-1/service-1";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".mdx"] };
"service-3/service-3.mdx": {
	id: "service-3/service-3.mdx";
  slug: "service-3/service-3";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".mdx"] };
"service-4/service-4.mdx": {
	id: "service-4/service-4.mdx";
  slug: "service-4/service-4";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".mdx"] };
};
"authors": {
"enscribe.md": {
	id: "enscribe.md";
  slug: "enscribe";
  body: string;
  collection: "authors";
  data: any
} & { render(): Render[".md"] };
};
"blog": {
"actf-2023/gcd-query.mdx": {
	id: "actf-2023/gcd-query.mdx";
  slug: "actf-2023/gcd-query";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"byuctf-2022/osint-compilation.mdx": {
	id: "byuctf-2022/osint-compilation.mdx";
  slug: "byuctf-2022/osint-compilation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"dhhutc-2022/port-authority.mdx": {
	id: "dhhutc-2022/port-authority.mdx";
  slug: "dhhutc-2022/port-authority";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"idekctf-2023/nmpz.mdx": {
	id: "idekctf-2023/nmpz.mdx";
  slug: "idekctf-2023/nmpz";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"launcher-2024/launcher.mdx": {
	id: "launcher-2024/launcher.mdx";
  slug: "launcher-2024/launcher";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"mhsctf-2023/matchmaker.mdx": {
	id: "mhsctf-2023/matchmaker.mdx";
  slug: "mhsctf-2023/matchmaker";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"picoctf-2022/beginners-compilation.mdx": {
	id: "picoctf-2022/beginners-compilation.mdx";
  slug: "picoctf-2022/beginners-compilation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"picoctf-2022/buffer-overflow.mdx": {
	id: "picoctf-2022/buffer-overflow.mdx";
  slug: "picoctf-2022/buffer-overflow";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"sekaictf-2022/forensics-writeup-compilation.mdx": {
	id: "sekaictf-2022/forensics-writeup-compilation.mdx";
  slug: "sekaictf-2022/forensics-writeup-compilation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"sekaictf-2023/azusawas-gacha-world.mdx": {
	id: "sekaictf-2023/azusawas-gacha-world.mdx";
  slug: "sekaictf-2023/azusawas-gacha-world";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"shctf-2022/compilation.mdx": {
	id: "shctf-2022/compilation.mdx";
  slug: "shctf-2022/compilation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"wolvctf-2023/wannaflag-series.mdx": {
	id: "wolvctf-2023/wannaflag-series.mdx";
  slug: "wolvctf-2023/wannaflag-series";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
};
"books": {
"laravel/laravel.mdx": {
	id: "laravel/laravel.mdx";
  slug: "laravel/laravel";
  body: string;
  collection: "books";
  data: any
} & { render(): Render[".mdx"] };
};
"me": {
"blockchain/me-2.mdx": {
	id: "blockchain/me-2.mdx";
  slug: "blockchain/me-2";
  body: string;
  collection: "me";
  data: any
} & { render(): Render[".mdx"] };
"full-stack/me-1.mdx": {
	id: "full-stack/me-1.mdx";
  slug: "full-stack/me-1";
  body: string;
  collection: "me";
  data: any
} & { render(): Render[".mdx"] };
};
"news": {
"tutorial/react.mdx": {
	id: "tutorial/react.mdx";
  slug: "tutorial/react";
  body: string;
  collection: "news";
  data: any
} & { render(): Render[".mdx"] };
};
"projects": {
"project-a.md": {
	id: "project-a.md";
  slug: "project-a";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-b.md": {
	id: "project-b.md";
  slug: "project-b";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"project-c.md": {
	id: "project-c.md";
  slug: "project-c";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
