export function cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
}

export function formatCPF(value: string): string {
    const cpf = cleanCPF(value);

    // Limits to 11 digits
    const limitedCpf = cpf.slice(0, 11);

    return limitedCpf
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // Stops after the 2 digits
}

export function isValidCPF(cpf: string): boolean {
    const clean = cleanCPF(cpf);

    if (clean.length !== 11) return false;

    // Check for all same digits (e.g. 111.111.111-11)
    if (/^(\d)\1+$/.test(clean)) return false;

    // Validate 1st digit
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(clean.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(clean.substring(9, 10))) return false;

    // Validate 2nd digit
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(clean.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(clean.substring(10, 11))) return false;

    return true;
}
