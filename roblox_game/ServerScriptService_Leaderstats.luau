--[[
  СИСТЕМА СТАТИСТИКИ И СОХРАНЕНИЯ (Leaderstats & DataStore)
  Поместите этот скрипт в ServerScriptService
]]

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerStats_v1")

local function onPlayerAdded(player)
	-- Создаем папку leaderstats для отображения таблицы лидеров (Tab в игре)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local coins = Instance.new("IntValue")
	coins.Name = "Монеты"
	coins.Value = 100 -- Стартовый баланс
	coins.Parent = leaderstats

	local level = Instance.new("IntValue")
	level.Name = "Уровень"
	level.Value = 1
	level.Parent = leaderstats

	-- Загрузка сохраненных данных с серверов Roblox
	local playerKey = "User_" .. player.UserId
	local success, savedData = pcall(function()
		return playerDataStore:GetAsync(playerKey)
	end)

	if success and savedData then
		coins.Value = savedData.Coins or coins.Value
		level.Value = savedData.Level or level.Value
		print("Данные игрока " .. player.Name .. " успешно загружены!")
	else
		print("Новый игрок или нет сохраненных данных для " .. player.Name)
	end

	-- Награда за нахождение в игре (пассивный доход)
	task.spawn(function()
		while player:IsDescendantOf(Players) do
			task.wait(60) -- Каждые 60 секунд
			coins.Value += 10
		end
	end)
end

local function onPlayerRemoving(player)
	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats then
		local dataToSave = {
			Coins = leaderstats:FindFirstChild("Монеты") and leaderstats.Монеты.Value or 0,
			Level = leaderstats:FindFirstChild("Уровень") and leaderstats.Уровень.Value or 1
		}
		
		local playerKey = "User_" .. player.UserId
		pcall(function()
			playerDataStore:SetAsync(playerKey, dataToSave)
		end)
		print("Данные игрока " .. player.Name .. " сохранены.")
	end
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoving)

-- Сохранение при выключении сервера
game:BindToClose(function()
	for _, player in ipairs(Players:GetPlayers()) do
		onPlayerRemoving(player)
	end
end)
