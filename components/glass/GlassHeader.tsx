import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

type GlassHeaderProps = {
  title: string;
  subtitle?: string;
};

export const GlassHeader: React.FC<GlassHeaderProps> = ({ title, subtitle }) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();

  const Container = ({ children }: { children: React.ReactNode }) => {
    if (supportsLiquidGlass) {
      return (
        <GlassView style={styles.header} glassEffectStyle="clear" isInteractive={false}>
          {children}
        </GlassView>
      );
    }
    return <View style={[styles.header, styles.headerFallback]}>{children}</View>;
  };

  return (
    <Container>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerFallback: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#222",
  },
});

export default GlassHeader;

