import React from "react";
import { Platform, StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export type GlassCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
  glassEffectStyle?: "clear" | "regular";
  isInteractive?: boolean;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  style,
  tintColor,
  glassEffectStyle = "regular",
  isInteractive = false,
  children,
  ...rest
}) => {
  const supportsLiquidGlass = Platform.OS === "ios" && isLiquidGlassAvailable();

  if (supportsLiquidGlass) {
    return (
      <GlassView
        style={style as ViewStyle}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        isInteractive={isInteractive}
        {...rest}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: "rgba(255,255,255,0.6)",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.35)",
          overflow: "hidden",
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

