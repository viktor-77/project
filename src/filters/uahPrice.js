export default function toFix(price) {
    let residues = (price % 1000)//.toFixed(2);
    let integerThousand = Math.floor(price / 1000) || ''
    let integerMilion = Math.floor(price / 1000000) || ''
    return (integerMilion + ' ' + integerThousand + ' ' + residues +' '+ 'грн')
}