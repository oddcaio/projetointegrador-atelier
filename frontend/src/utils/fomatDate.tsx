class FormatDate {
    toBrazilianDate(dateString: string): string {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }
}

export const formatDate = new FormatDate();
