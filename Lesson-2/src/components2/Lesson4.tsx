// interface IProps {
// 	color: string;
// 	width: number;
// 	height?: number;
// }

// function Lesson4({ color, width, height }: IProps) {
// 	return (
// 		<div
// 			style={{
// 				backgroundColor: color,
// 				width: width,
// 				height: height ?? 75,
// 			}}></div>
// 	);
// }

// export default Lesson4;

// ======== Homework 1 ========

// interface IProps {
// 	width: number;
// 	height: number;
// 	border: number;
// 	h1: string;
// }

// function Lesson4({ width, height, border, h1 }: IProps) {
// 	return (
// 		<div
// 			style={{
// 				width: `${width}px`,
// 				height: `${height}px`,
// 				border: `${border}px solid black`,
// 				backgroundColor: 'green',
// 				margin: '10px',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 			}}>
// 			<h1>{h1}</h1>
// 		</div>
// 	);
// }

// export default Lesson4;

// ======== Homework 2 ========

// interface IProps {
// 	width: number;
// 	height: number;
// 	border: number;
// 	h4: string;
// }

// function Lesson4({ width, height, border, h4 }: IProps) {
// 	return (
// 		<div
// 			style={{
// 				width: `${width}px`,
// 				height: `${height}px`,
// 				border: `${border}px solid black`,
// 				backgroundColor: '',
// 				// padding-left:10px,
// 				margin: '10px',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				borderRadius:"15px"
// 			}}>
// 			<h4>{h4}</h4>
// 		</div>
// 	);
// }
// export default Lesson4;

// ======== Homework 3 ========

// interface IProps {
// 	deg: number;
// }

// function RotateBox({ deg }: IProps) {
// 	return (
// 		<div
// 			style={{
// 				width: '120px',
// 				height: '120px',
// 				border: '2px solid black',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				transform: `rotate(${deg}deg)`,
// 				margin: '40px',
// 			}}>
// 			{deg} deg
// 		</div>
// 	);
// }

// export default RotateBox;

// ======== Homework 4 ========

// interface IProps {
// 	img: string;
// }

// function Lesson4({ img }: IProps) {
// 	return (
// 		<div
// 			style={{
// 				width: '200px',
// 				height: '200px',
// 				margin: '10px',
// 			}}>
// 			<img src={img} alt='image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
// 		</div>
// 	);
// }

// export default Lesson4;
