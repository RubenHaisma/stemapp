import React from "react";
import { Platform, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

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
  primary: { tint: "#0ea5e9", fg: "#ffffff", fallbackBg: "#0ea5e9" },
  neutral: { tint: "#ffffff", fg: "#000000", fallbackBg: "#ffffff", border: "#000000" },
  danger: { tint: "#ef4444", fg: "#ffffff", fallbackBg: "#ef4444" },
};

const sizeToPaddings: Record<Size, { pv: number; ph: number; radius: number; fontSize: number; gap: number }> = {
  large: { pv: 16, ph: 20, radius: 16, fontSize: 16, gap: 8 },
  medium: { pv: 12, ph: 16, radius: 14, fontSize: 15, gap: 6 },
  small: { pv: 10, ph: 14, radius: 12, fontSize: 14, gap: 6 },
};

export const GlassButton: React.FC<GlassButtonProps> = ({ title, onPress, style, variant = "primary", size = "large", iconLeft }) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();
  const colors = variantToColors[variant];
  const dims = sizeToPaddings[size];

  if (supportsLiquidGlass) {
    return (
      <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
        <GlassView
          style={[
            {
              paddingVertical: dims.pv,
              paddingHorizontal: dims.ph,
              borderRadius: dims.radius,
              alignItems: "center",
              justifyContent: "center",
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
      activeOpacity={0.88}
      onPress={onPress}
      style={[
        {
          paddingVertical: dims.pv,
          paddingHorizontal: dims.ph,
          borderRadius: dims.radius,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.fallbackBg,
          shadowColor: "#0f172a",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          borderWidth: colors.border ? 1 : 0,
          borderColor: colors.border,
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

