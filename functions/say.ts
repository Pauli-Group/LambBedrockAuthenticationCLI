const say = (label: string, thing: string | number ) => {
    console.log(`${label.padEnd(40, '.')} ${thing}`);
}

export default say;