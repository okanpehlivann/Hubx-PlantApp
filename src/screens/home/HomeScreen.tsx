import React, { useRef, useState } from 'react';
import {
  Linking,
  ScrollView,
  useWindowDimensions,
  View,
  Image,
  type ViewInstance,
} from 'react-native';
import {
  CategoryCard,
  CommonCard,
  CustomScreen,
  CustomText,
  EmptyState,
  ErrorState,
  QuestionCard,
  SearchInput,
  Skeleton,
} from '@components';
import styles from './HomeScreen.styles';
import { COLORS, SPACING } from '@constants';
import { IMAGES, PremiumMessageIcon } from '@assets';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@api';
import type { HomeContentProps } from '@types';
import { useHomeTourTargets } from '@context';
import HomeFeatureTour from './HomeFeatureTour';

const QuestionsSkeleton = () => (
  <View testID="questions-skeleton" style={styles.skeletonQuestionsRow}>
    <Skeleton style={styles.skeletonQuestionCard} />
    <Skeleton style={styles.skeletonQuestionCard} />
  </View>
);

const CategoriesSkeleton = () => (
  <View testID="categories-skeleton" style={styles.skeletonCategoryGrid}>
    <Skeleton style={styles.skeletonCategoryCard} />
    <Skeleton style={styles.skeletonCategoryCard} />
    <Skeleton style={styles.skeletonCategoryCard} />
    <Skeleton style={styles.skeletonCategoryCard} />
  </View>
);

const HomeContent = ({
  width,
  searchQuery,
  setSearchQuery,
  isSearchEmpty,
  questionsLoading,
  questionsError,
  filteredQuestions,
  categoriesLoading,
  categoriesError,
  filteredCategories,
  lastCategoryRowStartIndex,
  searchTargetRef,
  voiceButtonRef,
  questionsTargetRef,
}: HomeContentProps) => (
  <>
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
        style={styles.searchBackground}
        pointerEvents="none"
        resizeMode="stretch"
        accessible={false}
      />
      <SearchInput
        inputContainerRef={searchTargetRef}
        voiceButtonRef={voiceButtonRef}
        placeholder="Search for plants"
        clearable
        voiceEnabled
        speechLocale="tr-TR"
        returnKeyType="search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={styles.searchInput}
        accessibilityLabel="Search for plants"
      />
    </View>

    <CommonCard
      title="FREE Premium Available"
      description="Tap to upgrade your account!"
      showArrow
      icon={
        <PremiumMessageIcon width={52} height={44} style={styles.premiumIcon} />
      }
      style={styles.premiumCard}
      titleStyle={styles.premiumTitle}
      descriptionStyle={styles.premiumDescription}
    />

    {isSearchEmpty ? (
      <EmptyState
        title="No results found"
        description={`We couldn't find a plant matching “${searchQuery.trim()}”. Try another search.`}
        testID="home-empty-state"
      />
    ) : (
      <>
        {(questionsLoading ||
          questionsError ||
          filteredQuestions.length > 0) && (
          <View ref={questionsTargetRef} collapsable={false}>
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

            {questionsError ? (
              <ErrorState
                message="Plant guides could not be loaded."
                style={styles.sectionState}
              />
            ) : questionsLoading ? (
              <QuestionsSkeleton />
            ) : (
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.questionsContent}
                style={styles.questionsList}
              >
                {filteredQuestions.map(question => (
                  <QuestionCard
                    key={question.id}
                    title={question.title}
                    imageUri={question.image_uri}
                    onPress={() => Linking.openURL(question.uri)}
                    style={[styles.questionCard, { width: width * 0.7 }]}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {(categoriesLoading ||
          categoriesError ||
          filteredCategories.length > 0) && (
          <>
            {categoriesError ? (
              <ErrorState
                message="Plant categories could not be loaded."
                style={styles.sectionState}
              />
            ) : categoriesLoading ? (
              <CategoriesSkeleton />
            ) : (
              <View style={styles.categoryGrid}>
                {filteredCategories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    title={category.title}
                    imageUri={category.image.url}
                    style={[
                      styles.categoryCard,
                      index >= lastCategoryRowStartIndex &&
                        styles.lastCategoryCard,
                      { width: (width - SPACING.lg * 2 - SPACING.md) / 2 },
                    ]}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </>
    )}
  </>
);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchTargetRef = useRef<ViewInstance>(null);
  const voiceButtonRef = useRef<ViewInstance>(null);
  const questionsTargetRef = useRef<ViewInstance>(null);
  const { scanButtonRef, isAvailable: isHomeTourAvailable } =
    useHomeTourTargets();
  const { width } = useWindowDimensions();
  const {
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    error: categoriesError,
    data: categories,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    isLoading: questionsLoading,
    isFetching: questionsFetching,
    error: questionsError,
    data: questions,
    refetch: refetchQuestions,
  } = useGetQuestionsQuery();

  const handleRefresh = async () => {
    await Promise.all([refetchCategories(), refetchQuestions()]);
    setSearchQuery('');
  };

  const isRefreshing = categoriesFetching || questionsFetching;

  const orderedQuestions = [...(questions?.data ?? [])].sort(
    (firstQuestion, secondQuestion) =>
      firstQuestion.order - secondQuestion.order,
  );
  const orderedCategories = [...(categories?.data ?? [])].sort(
    (firstCategory, secondCategory) => firstCategory.rank - secondCategory.rank,
  );
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredQuestions = orderedQuestions.filter(question =>
    `${question.title} ${question.subtitle}`
      .toLowerCase()
      .includes(normalizedSearchQuery),
  );
  const filteredCategories = orderedCategories.filter(category =>
    `${category.title} ${category.name}`
      .toLowerCase()
      .includes(normalizedSearchQuery),
  );
  const lastCategoryRowStartIndex = Math.max(
    0,
    filteredCategories.length - (filteredCategories.length % 2 || 2),
  );

  const isSearchEmpty =
    normalizedSearchQuery.length > 0 &&
    !questionsLoading &&
    !categoriesLoading &&
    !questionsError &&
    !categoriesError &&
    filteredQuestions.length === 0 &&
    filteredCategories.length === 0;

  return (
    <>
      <CustomScreen
        scroll
        edges={['top']}
        contentContainerStyle={styles.container}
        statusBarStyle="dark-content"
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      >
        <HomeContent
          width={width}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchEmpty={isSearchEmpty}
          questionsLoading={questionsLoading}
          questionsError={questionsError}
          filteredQuestions={filteredQuestions}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          filteredCategories={filteredCategories}
          lastCategoryRowStartIndex={lastCategoryRowStartIndex}
          searchTargetRef={searchTargetRef}
          voiceButtonRef={voiceButtonRef}
          questionsTargetRef={questionsTargetRef}
        />
      </CustomScreen>

      <HomeFeatureTour
        enabled={isHomeTourAvailable}
        ready={!questionsLoading && !categoriesLoading}
        includeQuestions={filteredQuestions.length > 0}
        searchTargetRef={searchTargetRef}
        voiceButtonRef={voiceButtonRef}
        questionsTargetRef={questionsTargetRef}
        scanButtonRef={scanButtonRef}
      />
    </>
  );
}
