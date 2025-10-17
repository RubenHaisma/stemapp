import React, { useState } from "react";
import { Platform, StyleProp, Text, TouchableOpacity, View, ViewStyle, Animated } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { LiquidGlassTheme } from "@/constants/LiquidGlassTheme";

type Variant = "primary" | "neutral" | "danger";
type Size = "large" | "medium" | "small";

type GlassButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
};

const variantToColors: Record<Variant, { tint?: string; fg: string; fallbackBg: string; border?: string }> = {
  primary: { tint: LiquidGlassTheme.colors.primary.main, fg: "#ffffff", fallbackBg: LiquidGlassTheme.colors.primary.main },
  neutral: { tint: "#ffffff", fg: LiquidGlassTheme.colors.text.primary, fallbackBg: "#ffffff", border: LiquidGlassTheme.colors.border.medium },
  danger: { tint: LiquidGlassTheme.colors.error, fg: "#ffffff", fallbackBg: LiquidGlassTheme.colors.error },
};

const sizeToPaddings: Record<Size, { pv: number; ph: number; radius: number; fontSize: number; gap: number }> = {
  large: {
    pv: LiquidGlassTheme.spacing.lg,
    ph: LiquidGlassTheme.spacing.xl,
    radius: LiquidGlassTheme.borderRadius.md,
    fontSize: LiquidGlassTheme.typography.label.large.fontSize,
    gap: LiquidGlassTheme.spacing.sm
  },
  medium: {
    pv: LiquidGlassTheme.spacing.md,
    ph: LiquidGlassTheme.spacing.lg,
    radius: LiquidGlassTheme.borderRadius.sm,
    fontSize: LiquidGlassTheme.typography.label.medium.fontSize,
    gap: LiquidGlassTheme.spacing.xs
  },
  small: {
    pv: LiquidGlassTheme.spacing.sm,
    ph: LiquidGlassTheme.spacing.md,
    radius: LiquidGlassTheme.borderRadius.xs,
    fontSize: LiquidGlassTheme.typography.label.small.fontSize,
    gap: LiquidGlassTheme.spacing.xs
  },
};

export const GlassButton: React.FC<GlassButtonProps> = ({ title, onPress, style, variant = "primary", size = "large", iconLeft }) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();
  const colors = variantToColors[variant];
  const dims = sizeToPaddings[size];
  const [pressed, setPressed] = useState(false);

  const buttonShadow = pressed ? LiquidGlassTheme.shadows.button.pressed : LiquidGlassTheme.shadows.button.default;

  if (supportsLiquidGlass) {
    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <GlassView
          style={[
            {
              paddingVertical: dims.pv,
              paddingHorizontal: dims.ph,
              borderRadius: dims.radius,
              alignItems: "center",
              justifyContent: "center",
              ...buttonShadow,
            },
            style as ViewStyle,
          ]}
          glassEffectStyle="regular"
          tintColor={colors.tint}
          isInteractive
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: dims.gap }}>
            {iconLeft}
            <Text style={{ color: colors.fg, fontSize: dims.fontSize, fontWeight: "800" }}>{title}</Text>
          </View>
        </GlassView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        {
          paddingVertical: dims.pv,
          paddingHorizontal: dims.ph,
          borderRadius: dims.radius,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.fallbackBg,
          ...buttonShadow,
          borderWidth: colors.border ? 1.5 : 0,
          borderColor: colors.border,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style as ViewStyle,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: dims.gap }}>
        {iconLeft}
        <Text style={{ color: colors.fg, fontSize: dims.fontSize, fontWeight: "800" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GlassButton;

