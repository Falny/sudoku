import React from 'react'
// import { Cell } from "../../features/ui/Cell";
import './Desk.scss'
import { ContextDigit } from '../../app/App'
import { getRandomInt } from '../../shared/randomFunc'

export const Desk = React.memo(() => {
	const context = React.useContext(ContextDigit)

	if (!context) return

	const {
		choiceDigit,
		setChoiceDigit,
		setError,
		erase,
		setErase,
		hint,
		setHint,
		isNotes,
		setWin,
		win,
		table,
		tableTemp,
	} = context

	// const local = React.useMemo(() => {
	//   return window.localStorage.getItem("table");
	// }, []);

	// if (!local) return;

	// const table = React.useMemo(() => {
	//   console.log(JSON.parse(local));
	//   return local && JSON.parse(local);
	// }, []);

	// // удаляю из таблицы цифры
	// const tableTemp = React.useMemo(() => {
	//   return removeDigit({ table, level });
	// }, [level]);

	const [desk, setDesk] = React.useState<(number | string)[][]>(tableTemp)

	// React.useEffect(() => {
	//   setDesk(tableTemp);
	// }, [tableTemp]);

	// при иницилизации распределять все цифры по массивам, при новой цифре добавлять ее в массив, когда будет 9 цифр, они будут подсвечиваться
	const [checkDigit, setCheckDigit] = React.useState<[number, number][][]>(
		Array.from({ length: 9 }, () => []),
	)
	// веденая цифра
	const [cursor, setCursor] = React.useState<number[]>()

	//заметки
	const [notes, setNotes] = React.useState(
		Array.from({ length: 9 }, () =>
			Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ' ')),
		),
	)

	// индексы ячеек с такой же цифрой, на которую кликнули
	const [classBackDigit, setClassBackDigit] = React.useState<number[][]>(
		Array.from({ length: 9 }, () => []),
	)

	// индексы ячеейк в заметках для подсветки
	const [classBackDigitNotes, setClassBackDigitNotes] = React.useState<
		number[][]
	>(Array.from({ length: 9 }, () => []))

	// сверка правильно введенных цифр
	const [correct, setCorrect] = React.useState<(boolean | null)[][]>(
		Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => null)),
	)

	const [initDigit, setInitDigit] = React.useState<boolean[][]>(
		Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => true)),
	)

	// выйгрыш
	React.useEffect(() => {
		if (correct.every(row => row.every(col => col))) {
			setWin(true)
		}
	}, [correct])

	// проверка правильной цифры
	React.useEffect(() => {
		setCorrect(
			desk.map((obj, rowIn) =>
				obj.map((_, colIn) => {
					return desk[rowIn][colIn] === table[rowIn][colIn]
				}),
			),
		)
	}, [desk])

	// заполняю массив при иницилизации теми цирфами, что есть изначально, для бущей проверки и подсветки
	React.useMemo(() => {
		desk.map((obj, rowIn) =>
			obj.map((el, colIn) => {
				if (typeof el === 'number') {
					setCheckDigit(prev => {
						const copyArr = [...prev]
						copyArr[el - 1] = [...copyArr[el - 1], [rowIn, colIn]]
						return copyArr
					})
					setInitDigit(prev =>
						prev.map((row, rowI) =>
							rowI === rowIn
								? row.map((col, colI) => (colI === colIn ? false : col))
								: row,
						),
					)
				}
			}),
		)
	}, [])

	// очистка массива с индексами клеток, в зависимости от кликнутой цифры
	// в cursor помещаются индексы
	//пробагаюсь по массиву и вношу индексы клеток, чтобы подсвечивались, в зависимости от кликнутой цифры
	const onClickCursor = (rowInd: number, colInd: number) => {
		if (erase) {
			if (initDigit[rowInd][colInd]) {
				setDesk(prev => {
					return prev.map((obj, rowI) =>
						rowI === rowInd
							? obj.map((el, colI) => (colI === colInd ? '' : el))
							: obj,
					)
				})
			}
			setErase(false)
		}
		setClassBackDigit([])
		setClassBackDigitNotes([])
		setCursor([rowInd, colInd])
		const digit = desk[rowInd][colInd]
		desk.map((obj, rowIn) =>
			obj.map((el, colIn) => {
				if (digit === el && typeof el === 'number') {
					setClassBackDigit(prev => [...prev, [rowIn, colIn]])
				}
			}),
		)

		notes.map((row, rowIn) =>
			row.map((col, colIn) => {
				col.map((cell, cellIn) => {
					if (digit === Number(cell)) {
						setClassBackDigitNotes(prev => [...prev, [rowIn, colIn, cellIn]])
					}
				})
			}),
		)
	}

	//проверяю, если цифра не равно null и существуют индексы, то кладу цифру в массив
	React.useEffect(() => {
		if (choiceDigit !== null && cursor && !isNotes) {
			setDesk(prev => {
				let last = [...prev]
				let copy = [...last[cursor[0]]]
				copy[cursor[1]] = Number(choiceDigit)
				last[cursor[0]] = copy
				return last
			})

			// проверяю выбранную цифру с исходной
			if (table[cursor[0]][cursor[1]] === choiceDigit) {
				setCorrect(prev =>
					prev.map((obj, indexObj) =>
						indexObj === cursor[0]
							? obj.map((el, index) => (index === cursor[1] ? true : el))
							: obj,
					),
				)
				const el = table[cursor[0]][cursor[1]] // цифра из таблицы
				// добавляю в массив индексы чисел, для дальнейшей подсветки
				setCheckDigit(prev => {
					const newArr = [...prev]
					newArr[el - 1] = [...newArr[el - 1], [cursor[0], cursor[1]]]
					return newArr
				})

				// при правильной цифре нельзя ее удалять
				setInitDigit(prev =>
					prev.map((row, rowI) =>
						rowI === cursor[0]
							? row.map((col, colI) => (colI === cursor[1] ? false : col))
							: row,
					),
				)
			} else {
				setError(prev => prev + 1)
			}

			// очищаю по горизонтали, вертикали и в квадрате числа в заметках, при условии что в этом диапозоне поставлена цифра в ячейку
			setNotes(prev => {
				let arr = [...prev]
				arr[cursor[0]] = arr[cursor[0]].map(col =>
					col.map(elem => (Number(elem) === choiceDigit ? ' ' : elem)),
				)
				arr = arr.map(row =>
					row.map((col, colIn) =>
						colIn === cursor[1]
							? col.map(elem => (Number(elem) === choiceDigit ? ' ' : elem))
							: col,
					),
				)

				arr = arr.map((row, rowIn) =>
					Math.floor(rowIn / 3) === Math.floor(cursor[0] / 3)
						? row.map((col, colIn) =>
								Math.floor(colIn / 3) === Math.floor(cursor[1] / 3)
									? col.map(el => (Number(el) === choiceDigit ? ' ' : el))
									: col,
							)
						: row,
				)

				return arr
			})

			// если цифра поставлена там, где есть заметки, то ячейка с заметками очищается
			setNotes(prev =>
				prev.map((row, rowIn) =>
					rowIn === cursor[0]
						? row.map((col, colIn) =>
								colIn === cursor[1]
									? Array.from({ length: 9 }, () => ' ')
									: col,
							)
						: row,
				),
			)

			setChoiceDigit(null)
		}

		// очищаю массив после того как отработают стили, потому что без этого появляется конфликт стилей
		const timerEffect = setTimeout(() => {
			setCheckDigit(prev => prev.map(arr => (arr.length === 9 ? [] : arr)))
		}, 2000)

		return () => clearTimeout(timerEffect)
	}, [choiceDigit, cursor, hint])

	React.useEffect(() => {
		setClassBackDigit(() => [])
		if (hint) {
			const block = getRandomInt(desk)

			setCursor(() => [block[0], block[1]])

			const hintDigitFromtable = table[block[0]][block[1]]
			setChoiceDigit(hintDigitFromtable) // присвоила цифру, чтобы треггернулся эффект для правильного стиля

			desk.map((obj, rowIn) =>
				obj.map((el, colIn) => {
					if (hintDigitFromtable === el && typeof el === 'number') {
						setClassBackDigit(prev => [...prev, [rowIn, colIn]])
					}
				}),
			)

			const timer = setTimeout(() => {
				setHint(() => !hint)
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [hint])

	const onClickNotes = (rowInd: number, colInd: number) => {
		if (choiceDigit && initDigit[rowInd][colInd]) {
			setNotes(prev =>
				prev.map((row, rowIn) => {
					if (rowInd === rowIn) {
						return row.map((col, colIn) => {
							if (colInd === colIn) {
								let copy = [...col]
								if (copy[choiceDigit - 1] === choiceDigit.toString()) {
									copy[choiceDigit - 1] = ' '
									return copy
								}
								copy[choiceDigit - 1] = choiceDigit.toString()
								return copy
							} else {
								return col
							}
						})
					} else {
						return row
					}
				}),
			)
			setChoiceDigit(null)
		}
	}

	return (
		<ul className='desk'>
			{desk.map((row, rowInd) => (
				<li className='block-desk' key={rowInd}>
					{row.map((cell, colInd) => {
						const isCursotHighLight =
							(cursor && rowInd === cursor[0]) ||
							(cursor && colInd === cursor[1]) ||
							(cursor &&
								Math.floor(rowInd / 3) === Math.floor(cursor[0] / 3) &&
								Math.floor(colInd / 3) === Math.floor(cursor[1] / 3))
						const isActiveClassBackDigit = classBackDigit.some(
							arr => arr[0] === rowInd && arr[1] === colInd,
						)
						const isActiveCheckDigit = checkDigit.some(
							arr =>
								arr.length === 9 &&
								arr.some(el => el[0] === rowInd && el[1] === colInd),
						)
						const isHint =
							hint && cursor && rowInd === cursor[0] && colInd === cursor[1]

						return (
							<button
								key={`${rowInd}-${colInd}`}
								data-index={`${rowInd}-${colInd}`}
								className={[
									'item-desk',
									win && 'win',
									correct[rowInd][colInd] ? 'correct-digit' : 'incorrect-digit',
									isHint && 'highlight-correct-digit',
									isActiveClassBackDigit && 'desk-active-digit',
									isCursotHighLight && 'desk-highlight',
									isActiveCheckDigit && 'highlight-correct-digit',
								]
									.filter(Boolean)
									.join(' ')}
								onClick={() => onClickCursor(rowInd, colInd)}
							>
								{cell}
							</button>
						)
					})}
				</li>
			))}
			<ul
				className='notes'
				style={{
					pointerEvents: isNotes ? (choiceDigit ? 'auto' : 'none') : 'none',
				}}
			>
				{notes.map((row, rowInd) => (
					<li className='notes-item' key={rowInd}>
						{row.map((col, colInd) => (
							<div
								className='notes-item_inside'
								key={`${rowInd}-${colInd}`}
								onClick={() => onClickNotes(rowInd, colInd)}
							>
								{col.map((elemInside, elemIndex) => {
									const isActiveClassBackDigitNotes = classBackDigitNotes.some(
										arr =>
											rowInd === arr[0] &&
											colInd === arr[1] &&
											elemIndex === arr[2],
									)

									return (
										<span
											className={`notes-elem ${
												isActiveClassBackDigitNotes && 'notes-active-digit'
											}`}
											key={`${rowInd}-${colInd}-${elemIndex}`}
										>
											{elemInside}
										</span>
									)
								})}
							</div>
						))}
					</li>
				))}
			</ul>
		</ul>
	)
})
