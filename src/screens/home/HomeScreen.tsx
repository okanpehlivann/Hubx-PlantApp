import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  CategoryCard,
  CommonCard,
  CustomScreen,
  CustomText,
  QuestionCard,
  SearchInput,
} from '@components';
import styles from './HomeScreen.styles';
import { COLORS, SPACING } from '@constants';
import { IMAGES, PremiumMessageIcon } from '@assets';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@api';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categories,
  } = useGetCategoriesQuery();
  const {
    isLoading: questionsLoading,
    error: questionsError,
    data: questions,
  } = useGetQuestionsQuery();

  const orderedQuestions = [...(questions?.data ?? [])].sort(
    (firstQuestion, secondQuestion) =>
      firstQuestion.order - secondQuestion.order,
  );
  const orderedCategories = [...(categories?.data ?? [])].sort(
    (firstCategory, secondCategory) => firstCategory.rank - secondCategory.rank,
  );

  return (
    <CustomScreen
      scroll
      loading={categoriesLoading || questionsLoading}
      error={categoriesError || questionsError}
      contentContainerStyle={styles.container}
      statusBarStyle="dark-content"
    >
      <View style={styles.header}>
        <CustomText
          variant="regular"
          size={16}
          lineHeight={19}
          color={COLORS.textPrimary}
          letterSpacing={0.07}
        >
          Hi, plant lover!
        </CustomText>
        <View style={styles.greetingRow}>
          <CustomText
            variant="medium"
            size={24}
            lineHeight={28}
            letterSpacing={0.35}
            style={styles.greetingTitle}
          >
            Good Afternoon!
          </CustomText>
          <CustomText size={24} lineHeight={28} style={styles.weatherIcon}>
            ⛅
          </CustomText>
        </View>
      </View>

      <View style={styles.searchArea}>
        <Image
          source={IMAGES.homeBackground}
          resizeMode="stretch"
          style={styles.searchBackground}
          pointerEvents="none"
        />
        <SearchInput
          placeholder="Search for plants"
          returnKeyType="search"
          containerStyle={styles.searchInput}
          accessibilityLabel="Search for plants"
        />
      </View>

      <CommonCard
        title="FREE Premium Available"
        description="Tap to upgrade your account!"
        showArrow
        icon={<PremiumMessageIcon />}
        style={styles.premiumCard}
        titleStyle={styles.premiumTitle}
        descriptionStyle={styles.premiumDescription}
      />

      <CustomText
        variant="medium"
        size={15}
        lineHeight={20}
        letterSpacing={-0.24}
        color={COLORS.textPrimary}
        style={styles.sectionTitle}
      >
        Get Started
      </CustomText>

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.questionsContent}
        style={styles.questionsList}
      >
        {orderedQuestions.map(question => (
          <QuestionCard
            key={question.id}
            title={question.title}
            imageUri={question.image_uri}
            onPress={() => Linking.openURL(question.uri)}
            style={[styles.questionCard, { width: width * 0.7 }]}
          />
        ))}
      </ScrollView>

      <View style={styles.categoryGrid}>
        {orderedCategories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imageUri={category.image.url}
            style={[
              styles.categoryCard,
              { width: (width - SPACING.lg * 2 - SPACING.md) / 2 },
            ]}
          />
        ))}
      </View>
    </CustomScreen>
  );
}
