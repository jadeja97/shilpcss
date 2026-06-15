import type { Extend } from "@jadeja/ts/types/utils";

import type { SCSSConfig } from "@/types/bundlers/methods/pre-process";
import type { PurgeConfig, PurgeConfigSource } from "@/types/bundlers/methods/purge";
import type { TranspileColorFormat, TranspileConfig } from "@/types/bundlers/methods/transpile";
import type { Components, ComponentsShape } from "@/types/config/components";
import type { Intents, IntentsShape } from "@/types/config/intents";
import type { Mixins, MixinsShape } from "@/types/config/mixins";
import type { Properties, PropertiesShape } from "@/types/config/properties";
import type {
  ExtendTheme,
  InlineTheme,
  InlineThemeShape,
  Theme,
  ThemeShape,
} from "@/types/config/theme";
import type {
  ValueResolvers,
  ValueResolversShape,
  Values,
  ValuesShape,
} from "@/types/config/values";

/* ================================================================================================
	SHILP CONFIG
================================================================================================ */

/**
 * main ShilpCSS config object.
 */
export interface ShilpConfig {
  /**
   * optional SCSS pre-process behavior.
   */
  scss?: SCSSConfig;
  /**
   * source preset or custom globs for purge scanning.
   */
  source?: PurgeConfigSource;
  /**
   * optional PurgeCSS options factory.
   */
  purge?: PurgeConfig;
  /**
   * output color format for transpilation.
   */
  colorFormat?: TranspileColorFormat;
  /**
   * optional lightningcss options factory.
   */
  transpile?: TranspileConfig;

  /**
   * final Values.
   */
  values?: Values;
  /**
   * final Value resolvers.
   */
  valueResolvers?: ValueResolvers;
  /**
   * final Theme.
   */
  theme?: Theme;
  /**
   * final Inline theme function behavior per resolver key.
   */
  inlineTheme?: InlineTheme;
  /**
   * final Properties.
   */
  properties?: Properties;
  /**
   * final Intents.
   */
  intents?: Intents;
  /**
   * final Components.
   */
  components?: Components;
  /**
   * final Mixins.
   */
  mixins?: Mixins;

  /**
   * partial extension block for merging with defaults.
   */
  extend?: {
    /**
     * extend / Override resolved values.
     */
    values?: Extend<ValuesShape> | Values;
    /**
     * extend / Override resolved value resolvers.
     */
    valueResolvers?: Extend<ValueResolversShape> | ValueResolvers;
    /**
     * extend / Override resolved theme.
     */
    theme?: Extend<ThemeShape> | ExtendTheme;
    /**
     * extend / Override resolved inline theme function behaviour per resolver key.
     */
    inlineTheme?: Extend<InlineThemeShape> | InlineTheme;
    /**
     * extend / Override resolved properties.
     */
    properties?: Extend<PropertiesShape> | Properties;
    /**
     * extend / Override resolved intents.
     */
    intents?: Extend<IntentsShape> | Intents;
    /**
     * extend / Override resolved components.
     */
    components?: Extend<ComponentsShape> | Components;
    /**
     * extend / Override resolved mixins.
     */
    mixins?: Extend<MixinsShape> | Mixins;
  };
}

/* ================================================================================================
	SHILP CONFIG SHAPE
================================================================================================ */

/**
 * fully resolved internal config shape based on shipped defaults.
 */
export interface ShilpConfigShape {
  /**
   * default values data.
   */
  values: ValuesShape;
  /**
   * default value resolver data.
   */
  valueResolvers: ValueResolversShape;
  /**
   * default theme data.
   */
  theme: ThemeShape;
  /**
   * default inline theme data.
   */
  inlineTheme: InlineThemeShape;
  /**
   * default properties data.
   */
  properties: PropertiesShape;
  /**
   * default intents data.
   */
  intents: IntentsShape;
  /**
   * default mixins data.
   */
  mixins: MixinsShape;
  /**
   * default components data.
   */
  components: ComponentsShape;
}
