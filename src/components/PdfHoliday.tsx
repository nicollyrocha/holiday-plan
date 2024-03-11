import { fromDateToString } from '../functions/fromDateToString';
import { Holiday } from '../models/holiday.model';
import {
	PDFDownloadLink,
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 5,
		padding: 5,
	},
	text: {
		fontSize: 12,
		margin: '5px',
	},
	value: { fontWeight: 'bold', fontSize: 12 },
	title: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 14,
		textAlign: 'center',
	},
});

/**
 * Pdf gerenated from a holiday. The component uses the values passed by parameters
 * */
export const PdfHoliday = ({ row }: { row: Holiday }) => {
	return (
		<>
			<Document>
				<Page>
					<View style={styles.section}>
						<Text style={styles.title}>{row.title}</Text>
						<Text style={styles.subtitle}>{row.description}</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.text}>
							Date:{' '}
							<Text style={styles.value}>
								{row.date ? fromDateToString(row.date) : ''}
							</Text>
						</Text>
						<Text style={styles.text}>
							Participants:{' '}
							<Text style={styles.value}>
								{row.participants ? row.participants.join(', ') : ''}
							</Text>
						</Text>
						<Text style={styles.text}>
							Locations: <Text style={styles.value}>{row.locations.join(', ')}</Text>
						</Text>
					</View>
				</Page>
			</Document>
		</>
	);
};
