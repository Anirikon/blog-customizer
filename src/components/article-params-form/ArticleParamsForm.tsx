import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

type Props = {
	onSubmit: (a: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: Props) => {
	const [isOpen, setState] = useState(false);
	const [fontOption, setOption] = useState(fontFamilyOptions[0]);
	const [fontSizeOption, setFontSizeOption] = useState(fontSizeOptions[0]);
	const [fontColorOption, setfontColorOption] = useState(fontColors[0]);
	const [backgroundColorOption, setBackgroundColorOption] = useState(
		backgroundColors[0]
	);
	const [widthOption, setWidthOption] = useState(contentWidthArr[0]);

	function toggle() {
		setState(!isOpen);
	}

	function handleFormSubmit(event: React.SyntheticEvent<EventTarget>) {
		event.preventDefault();
		onSubmit({
			fontFamilyOption: fontOption,
			fontColor: fontColorOption,
			backgroundColor: backgroundColorOption,
			contentWidth: widthOption,
			fontSizeOption: fontSizeOption,
		});
	}

	function handleFormReset() {
		onSubmit({
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: fontSizeOptions[0],
		});
		setOption(fontFamilyOptions[0]);
		setFontSizeOption(fontSizeOptions[0]);
		setfontColorOption(fontColors[0]);
		setBackgroundColorOption(backgroundColors[0]);
		setWidthOption(contentWidthArr[0]);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggle();
				}}
			/>
			<aside
				className={styles.container}
				style={{
					transform: `${
						isOpen === false ? 'translate(-616px)' : 'translate(0px)'
					}`,
				}}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}
					style={{ gap: '50px' }}>
					<Select
						selected={fontOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setOption}></Select>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						title='Размер шрифта'
						onChange={setFontSizeOption}></RadioGroup>
					<Select
						selected={fontColorOption}
						options={fontColors}
						title='Размер шрифта'
						onChange={setfontColorOption}></Select>
					<Separator />
					<Select
						selected={backgroundColorOption}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBackgroundColorOption}></Select>
					<Select
						selected={widthOption}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setWidthOption}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
