import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
    Animated,
    PanResponder,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

export interface SwipeableRowRef {
  close: () => void;
}

interface SwipeableRowProps {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  onOpen?: () => void;
  delay?: number; // Add delay prop for entrance animation
}

export const SwipeableRow = React.forwardRef<
  SwipeableRowRef,
  SwipeableRowProps
>(({ children, onEdit, onDelete, onOpen, delay = 0 }, ref) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const position = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const ACTION_WIDTH = 120; // Width of the action buttons area
  const timerRef = useRef<any>(null);

  React.useImperativeHandle(ref, () => ({
    close,
  }));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      close();
    }, 5000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => clearTimer();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        clearTimer(); // Clear timer if user interacts
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only activate if horizontal swipe is dominant
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (evt, gestureState) => {
        clearTimer(); // Clear timer while moving
        // Limit swipe to the left (negative values)
        if (gestureState.dx < 0) {
          position.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -ACTION_WIDTH / 2) {
          // If swiped far enough, snap open
          Animated.spring(position, {
            toValue: -ACTION_WIDTH,
            useNativeDriver: true,
            bounciness: 0,
          }).start(() => {
            onOpen?.();
            startTimer(); // Start timer when opened
          });
        } else {
          // Otherwise snap back
          close();
        }
      },
    }),
  ).current;

  const close = () => {
    clearTimer(); // Clear timer when closing
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        },
      ]}
    >
      {/* Action Buttons (Behind the content) */}
      <View style={[styles.actionsContainer, { width: ACTION_WIDTH }]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => {
            close();
            onEdit();
          }}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => {
            close();
            onDelete();
          }}
        >
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Swipeable Content */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: position }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 12,
  },
  content: {
    backgroundColor: "transparent", // Let child background show
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
  },
});
