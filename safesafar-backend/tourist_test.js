import { createClient } from '@supabase/supabase-js'

// -------------------------
// Supabase setup
// -------------------------
const supabaseUrl = 'https://blmdribxvczlzglskyre.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbWRyaWJ4dmN6bHpnbHNreXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODY3MTAsImV4cCI6MjA3NDM2MjcxMH0.IniFbKNOVOgv3JLNms1Km6fPHOt7D335BjzcyFttHoI' // use anon/public key

// JWTs for roles

const touristJwt = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZ4TjBXNDVqa1RHS1NxWFUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JsbWRyaWJ4dmN6bHpnbHNreXJlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmY2E3MDM0Mi1iYjZjLTRiY2ItYjNlZC0zNWI5MWZmOTBjZWMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4Nzk5NjQ3LCJpYXQiOjE3NTg3OTYwNDcsImVtYWlsIjoidG91cmlzdEBzYWZlc2FmYXIuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTg3OTYwNDd9XSwic2Vzc2lvbl9pZCI6IjhhMWMyYmE2LTg4NjItNGNhYi1hMjllLWE2N2U4YzE0NWRhNiIsImlzX2Fub255bW91cyI6ZmFsc2V9.RqAqkWng8XS1tf3Q2zJ-NMLPE-Lib58cf7nI43vN968'
const policeJwt = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZ4TjBXNDVqa1RHS1NxWFUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JsbWRyaWJ4dmN6bHpnbHNreXJlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhNTJmMzYzZS01NGNhLTRmNTgtOGE4MS02OTdjZGFjZThjNzMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4ODAwNzg5LCJpYXQiOjE3NTg3OTcxODksImVtYWlsIjoicG9saWNlQHNhZmVzYWZhci5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc1ODc5NzE4OX1dLCJzZXNzaW9uX2lkIjoiZTk2ZmI2MmMtMzQwMS00OGQyLTgxNjEtNmMxNjQyN2NhYTFhIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.BeXAo3ZdSyA9M7jp7ACx2zLxejHEUpbp241rwIwWEm8'
const govJwt = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZ4TjBXNDVqa1RHS1NxWFUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JsbWRyaWJ4dmN6bHpnbHNreXJlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NmM4NzViMi0yYzMwLTRjNWEtYjA5OS0wMjExNmEyNmZlMzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4ODAyMDEzLCJpYXQiOjE3NTg3OTg0MTMsImVtYWlsIjoiZ292dEBzYWZlc2FmYXIuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTg3OTg0MTN9XSwic2Vzc2lvbl9pZCI6IjRmMTQzOTJlLTVlZmYtNDQ4Ni04M2RiLTBmZjAxYzgxYWI0ZCIsImlzX2Fub255bW91cyI6ZmFsc2V9.Jncrs1oL1U14HleVAwJtSJx9j_Ey-fhGDYSPu3M_kC4'
const adminJwt = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZ4TjBXNDVqa1RHS1NxWFUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JsbWRyaWJ4dmN6bHpnbHNreXJlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJlMzg5MWFhOC04NjdhLTQ0Y2QtODFkNy0yZDFhN2UyYjkxYTciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4ODAyMDUwLCJpYXQiOjE3NTg3OTg0NTAsImVtYWlsIjoiYWRtaW5Ac2FmZXNhZmFyLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzU4Nzk4NDUwfV0sInNlc3Npb25faWQiOiIzYjFlZGRjNC1kYjhkLTQyNjQtYWIyYS00OTlhMTJmM2EwNmYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.yqM56ZT2ROzawordcKYBmnkTM2Zhi3Ar_rdPsrPojUU'
const tourismDept = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InZ4TjBXNDVqa1RHS1NxWFUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JsbWRyaWJ4dmN6bHpnbHNreXJlLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIzZmUwOTk1OC1kY2UxLTRlMmYtOTM3Zi1mZDJiZjEyODJkYzEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4ODAyODQ2LCJpYXQiOjE3NTg3OTkyNDYsImVtYWlsIjoidG91cmlzbUBzYWZlc2FmYXIuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTg3OTkyNDZ9XSwic2Vzc2lvbl9pZCI6IjcwMzU4NDJhLWE5NjItNDA4YS04NGNhLTA0ZTk0NWY3OGM0NSIsImlzX2Fub255bW91cyI6ZmFsc2V9.QNhuPLW-Xdrymj6nF2TcsD-1pwlMGvnPN9zN1JNUQJg'
const supabaseTourist = createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Authorization: `Bearer ${touristJwt}` } }
})

const supabasePolice = createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Authorization: `Bearer ${policeJwt}` } }
})

const supabaseGov = createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Authorization: `Bearer ${govJwt}` } }
})

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Authorization: `Bearer ${adminJwt}` } }
})

// -------------------------
// Generic test function
// -------------------------
async function testRole(roleName, client, uuid) {
  console.log(`\n--- ${roleName} Tests ---`)

  // SELECT
  let { data: selectData, error: selectError } = await client
    .from('incident_reports')
    .select('*')
  if (selectError) console.error(`${roleName} SELECT failed:`, selectError.message)
  else console.log(`${roleName} sees reports:`, selectData)

  // INSERT
  let { data: insertData, error: insertError } = await client
    .from('incident_reports')
    .insert({
      reported_by: uuid,
      title: `${roleName} Test Insert`,
      description: `Creating a report as ${roleName}`
    })
    .select()
  if (insertError) console.error(`${roleName} INSERT failed:`, insertError.message)
  else console.log(`${roleName} inserted report:`, insertData)

  // UPDATE (attempt to update first report)
  let { data: updateData, error: updateError } = await client
    .from('incident_reports')
    .update({ title: `${roleName} Update Attempt` })
    .eq('id', 1)
    .select()
  if (updateError) console.error(`${roleName} UPDATE failed:`, updateError.message)
  else console.log(`${roleName} updated report:`, updateData)

  // DELETE (attempt to delete first report)
  let { data: deleteData, error: deleteError } = await client
    .from('incident_reports')
    .delete()
    .eq('id', 1)
    .select()
  if (deleteError) console.error(`${roleName} DELETE failed:`, deleteError.message)
  else console.log(`${roleName} deleted report:`, deleteData)
}

// -------------------------
// Run all role tests
// -------------------------
async function runAllTests() {
  await testRole('Tourist', supabaseTourist, 'fca70342-bb6c-4bcb-b3ed-35b91ff90cec')
  await testRole('Police', supabasePolice, 'a52f363e-54ca-4f58-8a81-697cdace8c73')
  await testRole('Government', supabaseGov, '86c875b2-2c30-4c5a-b099-02116a26fe34')
  await testRole('Admin', supabaseAdmin, 'e3891aa8-867a-44cd-81d7-2d1a7e2b91a7')
}

runAllTests()