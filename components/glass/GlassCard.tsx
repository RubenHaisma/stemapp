import React from "react";
import { Platform, StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { LiquidGlassTheme } from "@/constants/LiquidGlassTheme";

export type GlassCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
  glassEffectStyle?: "clear" | "regular";
  isInteractive?: boolean;
  variant?: "base" | "elevated" | "tinted" | "frosted";
};

export const GlassCard: React.FC<GlassCardProps> = ({
  style,
  tintColor,
  glassEffectStyle = "regular",
  isInteractive = false,
  variant = "elevated",
  children,
  ...rest
}) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();

  if (supportsLiquidGlass) {
    return (
      <GlassView
        style={[
          {
            ...LiquidGlassTheme.shadows.glass.medium,
            borderRadius: LiquidGlassTheme.borderRadius.lg,
          },
          style as ViewStyle,
        ]}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        isInteractive={isInteractive}
        {...rest}
      >
        {children}
      </GlassView>
    );
  }

  // Enhanced fallback for non-iOS 26 devices
  const glassVariantStyle = LiquidGlassTheme.glass[variant];

  return (
    <View
      style={[
        {
          backgroundColor: glassVariantStyle.backgroundColor,
          borderRadius: LiquidGlassTheme.borderRadius.lg,
          borderWidth: glassVariantStyle.borderWidth,
          borderColor: glassVariantStyle.borderColor,
          overflow: "hidden",
          ...LiquidGlassTheme.shadows.glass.medium,
        },
        style as ViewStyle,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default GlassCard;

