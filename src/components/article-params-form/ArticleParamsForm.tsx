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
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useDisclosure } from 'src/hooks/useDisclosure';

type Props = {
	onSubmit: (a: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: Props) => {
	const [state, setState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const asideRef = useRef(null);

	function toggle() {
		setIsOpen(!isOpen);
	}

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	function handleFormSubmit(event: React.SyntheticEvent<EventTarget>) {
		event.preventDefault();
		onSubmit(state);
	}

	function handleFormReset() {
		onSubmit(defaultArticleState);
		setState(defaultArticleState);
	}

	useDisclosure(asideRef, setIsOpen);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggle();
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(
					styles.container,
					isOpen === true && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<div className={styles.title}>Задайте параметры</div>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleOnChange('fontFamilyOption')}></Select>
					<RadioGroup
						name='Размер шрифта'
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={handleOnChange('fontSizeOption')}></RadioGroup>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}></Select>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}></Select>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
