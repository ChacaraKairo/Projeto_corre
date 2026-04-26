import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  } from 'lucide-react-native';
import React,
  { useState } from 'react';
import {
    Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';

import { styles } from '../../../../styles/generated/components/telas/Calculadora/ui/AccordionSectionStyles';
interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isComplete: boolean;
  onHelpClick: () => void;
  initialExpanded?: boolean;
}

export const AccordionSection: React.FC<
  AccordionSectionProps
> = ({
  title,
  icon,
  children,
  isComplete,
  onHelpClick,
  initialExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const cardColor = isDark ? '#161616' : '#FFFFFF';
  const defaultBorderColor = isDark ? '#333' : '#E0E0E0';
  const errorBorderColor = isDark ? '#7f1d1d' : '#FFCDD2'; // Vermelho suave
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const textMuted = isDark ? '#888' : '#666';

  const currentBorderColor = isComplete
    ? defaultBorderColor
    : errorBorderColor;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cardColor,
          borderColor: currentBorderColor,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          {icon}
          <Text
            style={[styles.title, { color: textColor }]}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={onHelpClick}
            style={styles.helpButton}
            activeOpacity={0.6}
          >
            <HelpCircle size={18} color={textMuted} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          {!isComplete && !expanded && (
            <View style={styles.badgeIncompleto}>
              <Text style={styles.badgeTexto}>
                Pendente
              </Text>
            </View>
          )}
          {expanded ? (
            <ChevronUp size={20} color={textMuted} />
          ) : (
            <ChevronDown size={20} color={textMuted} />
          )}
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
};


