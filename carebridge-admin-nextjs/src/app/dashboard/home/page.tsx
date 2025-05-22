import { Card, CardContent, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";


export default function HomePage() {
    return (
        <Paper elevation={0} sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h5" gutterBottom>
                Selamat datang, Admin!
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total User</Typography>
                            <Typography variant="h4" color="primary">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Transaksi</Typography>
                            <Typography variant="h4" color="primary">350</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Aktif Hari Ini</Typography>
                            <Typography variant="h4" color="primary">15</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Daftar User Terbaru</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Budi Santoso" secondary="budi@email.com" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Siti Aminah" secondary="siti@email.com" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Andi Wijaya" secondary="andi@email.com" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Aktivitas Terbaru</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Budi login" secondary="2 menit lalu" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Siti menambah data" secondary="10 menit lalu" />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Andi logout" secondary="30 menit lalu" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
}