import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from 'src/components/app/App.module.scss';

export const App = () => {
	const [articleStylesState, setArticleStylesState] =
		useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStylesState.fontFamilyOption.value,
					'--font-size': articleStylesState.fontSizeOption.value,
					'--font-color': articleStylesState.fontColor.value,
					'--container-width': articleStylesState.contentWidth.value,
					'--bg-color': articleStylesState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={(articleStyles) => setArticleStylesState(articleStyles)}
			/>
			<Article />
		</main>
	);
};
