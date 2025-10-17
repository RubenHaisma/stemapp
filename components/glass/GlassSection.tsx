import React from "react";
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { LiquidGlassTheme } from "@/constants/LiquidGlassTheme";

type GlassSectionProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  variant?: "base" | "elevated" | "tinted";
};

export const GlassSection: React.FC<GlassSectionProps> = ({ title, children, style, variant = "base" }) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (supportsLiquidGlass) {
      return (
        <GlassView style={[styles.section, style as ViewStyle]} glassEffectStyle="regular">
          {children}
        </GlassView>
      );
    }
    const glassStyle = LiquidGlassTheme.glass[variant];
    return (
      <View
        style={[
          styles.section,
          {
            backgroundColor: glassStyle.backgroundColor,
            borderWidth: glassStyle.borderWidth,
            borderColor: glassStyle.borderColor,
            ...LiquidGlassTheme.shadows.glass.light,
          },
          style as ViewStyle,
        ]}
      >
        {children}
      </View>
    );
  };

  return (
    <Wrapper>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.sectionBody}>{children}</View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: LiquidGlassTheme.spacing.lg,
    borderRadius: LiquidGlassTheme.borderRadius.md,
    gap: LiquidGlassTheme.spacing.sm,
  },
  sectionTitle: {
    ...LiquidGlassTheme.typography.headline.small,
    color: LiquidGlassTheme.colors.text.primary,
  },
  sectionBody: {
    gap: LiquidGlassTheme.spacing.sm,
  },
});

export default GlassSection;

