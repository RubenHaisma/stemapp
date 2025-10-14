import React from "react";
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

type GlassSectionProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const GlassSection: React.FC<GlassSectionProps> = ({ title, children, style }) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (supportsLiquidGlass) {
      return (
        <GlassView style={[styles.section, style as ViewStyle]} glassEffectStyle="regular">
          {children}
        </GlassView>
      );
    }
    return <View style={[styles.section, styles.sectionFallback, style as ViewStyle]}>{children}</View>;
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
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  sectionFallback: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sectionBody: {
    gap: 8,
  },
});

export default GlassSection;

